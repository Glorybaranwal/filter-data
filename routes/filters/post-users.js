const formidable = require("formidable");
const detect = require("detect-file-type");
const {
    v1: uuidv1
} = require("uuid");
const fs = require("fs");
const path = require("path")
const mv = require('mv');


module.exports = (req, res) => {

    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.send("error in file")
        }
        //console.log(`title: ${fields.title}`)
        //console.log(`desc: ${fields.desc}`)
        //console.log(`files.picture.filepath: ${fields.files.picture.filepath}`)
        //console.log(`files.picture.display_id: ${fields.files.picture.display_id}`)

        detect.fromFile(files.picture.filepath, (err, result) => {
            // res.send("cool")

            const pictureName = uuidv1() + "." + result.ext
            const allowedImageTypes = ["jpg", "jpeg", "png"]
            if (!allowedImageTypes.includes(result.ext)) {
                return res.send("Image not allowed")
            }
            const oldPath = files.picture.filepath
            const newPath = path.join(__dirname, "..", "..", "picture", pictureName)
            mv(oldPath, newPath, err => {
                if (err) {
                    console.log(err);
                    return
                }
                const user = {
                    "title": fields.title,
                    "picture": pictureName,
                    "desc": fields.desc,
                    "display_id": fields.display_id
                }
                db.collection("filters").insertOne(user, (err, dbResponse) => {
                    if (err) {
                        return res.send(err)
                    }
                    console.log(db)
                    console.log(db.collection)
                    return res.send(user)


                })
            })
           // return res.send(user)


            


        })
        // console.log(files)

    })


}