const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Category = require('../models/categoryModel');
const Plan = require('../models/planModel');

const firebaseAdmin = require('../service/firebase');
const bucket = firebaseAdmin.storage().bucket();
const { v4: uuidv4 } = require('uuid');

const general = {
    getCategories: handleErrorAsync(async (req, res, next) => {
        const categories = await Category.find({}, { _id: 0, name: 1, template: 1 });

        res.status(200).json(
            getHttpResponse({
                data: categories,
                message: '取得成功',
            }),
        );
    }),
    getPlans: handleErrorAsync(async (req, res, next) => {
        const plans = await Plan.find({}, { _id: 0, title: 1, price: 1, items: 1 });
        res.status(200).json(
            getHttpResponse({
                data: plans,
                message: '取得成功',
            }),
        );
    }),
    uploadImage: handleErrorAsync(async (req, res, next) => {
        if (!req.files.length) {
            return next(appError(400, '40106', '無檔案或格式不正確'));
        }

        const file = req.files[0];
        const blob = bucket.file(`images/${uuidv4()}.${file.originalname.split('.').pop()}`);
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', () => {
            const config = {
                action: 'read',
                expires: '12-31-2500',
            };
            blob.getSignedUrl(config, (err, imgUrl) => {
                res.status(200).json(
                    getHttpResponse({
                        data: { imgUrl },
                        message: '圖片上傳成功',
                    }),
                );
            });
        });

        // 如果上傳過程中發生錯誤，會觸發 error 事件
        blobStream.on('error', (err) => {
            return next(appError(400, '40401', '上傳圖片失敗'));
        });

        // 將檔案的 buffer 寫入 blobStream
        blobStream.end(file.buffer);
    }),
};

module.exports = general;
