const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// diskStorage 엔진으로 파일의 저장경로와 파일명 세팅한다.
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});

// 특정 파일 형식만 저장하기 위해서는 fileFilter 함수 사용
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('.png, .jpg, .jpeg, .gif의 파일형식만 업로드가 가능합니다.'))
        }
        callback(null, true)
    },
}).any(); // any() 는 전달 받는 모든 파일을 받는다. 파일은 req.files에 저장되어있다

router.post('/files', (req, res, next) => {
    const reqFiles = [];
    try {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send({
                    message: err.message,
                    files: reqFiles
                });
            }
            for (var i = 0; i < req.files.length; i++) {
                reqFiles.push(req.files[i].filename)
            }
            res.status(200).send({
                message: "파일이 성공적으로 업로드 되었습니다.",
                files: reqFiles
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `다음과 같은 이유로 파일을 업로드하지 못했습니다. : ${err}`,
            files: reqFiles
        });
    }
});

module.exports = router;