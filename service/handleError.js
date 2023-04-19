const handleError = (res, err) => {
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  // 傳入型別來決定回傳格式
  // String => HTML <h1>Hello</h1>
  // Array or Object => JSON
  res
    .status(400)
    .send({
      status: true,
      message
    });
}

module.exports = handleError;