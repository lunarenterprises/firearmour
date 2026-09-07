var model = require('../model/addteam')
var formidable = require('formidable')
var fs = require('fs')

module.exports.AddTeamMember = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            let { name, designation } = fields
            if (!name || !designation) {
                return res.end({
                    result: false,
                    messaage: "insufficient parameter"
                })
            }
            var checkteam = await model.CheckTeam(name)
            console.log(checkteam);

            if (checkteam.length == 0) {
                if (files.image) {
                    var oldPath = files.image.filepath;
                    var newPath =
                        process.cwd() +
                        "/uploads/teams/" + files.image.originalFilename
                    let rawData = fs.readFileSync(oldPath);
                    console.log(oldPath);

                    fs.writeFileSync(newPath, rawData)
                    var image = "/uploads/teams/" + files.image.originalFilename
                    console.log(name, designation, image);

                    var InsertteamMember = await model.AddTeamMemberQuery(name, designation, image)
                    if (InsertteamMember.affectedRows) {
                        return res.send({
                            result: true,
                            message: "team member added"
                        })
                    } else {
                        return res.send({
                            result: false,
                            message: "failed to add team member"
                        })
                    }

                }
            } else {
                return res.send({
                    result: false,
                    message: "this name is already added"
                })
            }
        })


    } catch
    (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}

