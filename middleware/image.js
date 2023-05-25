const { handleErrorAsync, appError } = require('../utils/errorHandler');
const multer = require('multer');
const path = require('path');

const upload = multer({
    // todo 當檔案大小超過限制時，如何回傳自定義的錯誤訊息？
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
            return cb(appError(400, '40106', '檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'));
            //cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'));
        }
        cb(null, true);
    },
}).any();

module.exports = upload;
