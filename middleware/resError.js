// 開發環境錯誤
const resErrorDev = (err, res) => {
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack
  });
}

// 正式環境
const resErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message
        });
    } else {
        console.error("出現重大錯誤", err);
        res.status(500).json({
            status: 'error',
            message: '系統錯誤，請稍後再試!'
        });
    }
}
// 區分環境 - 錯誤處理
function resError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  // dev
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res)
  }
  // prod
  if (err.name === 'ValidationError') {
    err.message = "資料欄位未填寫正確，請重新輸入!";
    err.isOperational = true;
    return resErrorProd(err, res)
  } else if (err.name === 'CastError'){
    err.message = "找不到資料，請重新輸入!";
    err.isOperational = true;
    return resErrorProd(err, res)
  }
  resErrorProd(err, res)
}

module.exports = resError;
