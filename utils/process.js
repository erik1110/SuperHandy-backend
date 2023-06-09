// 程式出現重大錯誤
process.on('uncaughtException', (err) => {
    console.error('Uncaughted Exception！');
    console.error(err);
    process.exit(1);
});
// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
    console.error('Uncaughted rejection：', promise, '原因：', err);
});
