// 引入 Mongoose
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/exam', { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('** connect.js ** mongoDB connect successfully!\n');
});

module.exports = mongoose;