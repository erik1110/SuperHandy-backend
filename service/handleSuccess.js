function handleSuccess (res, data) { 
  // 傳入型別來決定回傳格式
  // String => HTML <h1>Hello</h1>
  // Array or Object => JSON
  res.send({
    status: true,
    data
  }).end();
}

module.exports = handleSuccess;