// 404 錯誤
function notFound(req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}

module.exports = notFound