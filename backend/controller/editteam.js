var model = require('../model/editteam')
var formidable = require('formidable')
var fs = require('fs')

module.exports.EditTeam = async (req, res) => {
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
            let { t_id, name, designation } = fields
            if (!t_id || !name || !designation) {
                return res.send({
                    result: false,
                    messaage: "insufficient parameter"
                })
            }
            var checkTeam = await model.CheckTeamQuery(t_id)
            console.log(checkTeam);

            if (checkTeam.length > 0) {
                console.log(t_id);

                let condition = ``;

                if (name) {
                    if (condition == '') {
                        condition = `set t_name ='${name}' `
                    } else {
                        condition += `,t_name='${name}'`
                    }
                }
                if (designation) {
                    if (condition == '') {
                        condition = `set t_designation ='${designation}' `
                    } else {
                        condition += `,t_designation='${designation}'`
                    }
                }


                if (condition !== '') {
                    var EditTeam = await model.ChangeTeam(condition, t_id)
                }
                if (EditTeam) {

                    if (files.image) {
                        var oldPath = files.image.filepath;
                        var newPath =
                            process.cwd() +
                            "/uploads/teams/" + files.image.originalFilename
                        let rawData = fs.readFileSync(oldPath);
                        console.log(oldPath);

                        fs.writeFileSync(newPath, rawData)
                        var image = "/uploads/teams/" + files.image.originalFilename
                        console.log(t_id, name, designation, image);

                        var InsertTeamimage = await model.Updateimage(image, t_id)
                        if (InsertTeamimage.affectedRows) {
                            return res.send({
                                result: true,
                                message: "Team updated successfully"
                            })
                        } else {
                            return res.send({
                                result: false,
                                message: "failed to update Team"
                            })
                        }

                    }
                    return res.send({
                        result: true,
                        message: "Team updated successfully"
                    })
                } else {
                    return res.send({
                        result: false,
                        message: "failed to update Team"
                    })
                }

            } else {
                return res.send({
                    result: false,
                    message: "Team does not exists"
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

