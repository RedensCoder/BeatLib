const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = `public/users/${req.body.username}/beats/${req.body.name}`;
        const dir1 = `public/users/${req.body.username}/beats`;
        if (!fs.existsSync(dir1)){
            fs.mkdirSync(dir1);
        }

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        let files = fs.readdirSync(dir).filter(function(el, i) {return el.substring(el.length - 3);});

        if (files.length <= 5) {
            cb(null, dir);
        } 
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const types = ["audio/mpeg", "audio/wave", "image/png", "image/jpeg", "image/jpg", "application/zip", "application/x-zip-compressed", "audio/wav"];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports =  multer({storage, fileFilter})