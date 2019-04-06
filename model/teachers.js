// 引入 Mongoose
let mongoose = require('./connect');

// 定义学生集合数据结构
let teacherSchema = mongoose.Schema({
    name: { // 中文姓名
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    id: { // 教工号
        type: String,
        trim: true,
        minlength: 1
    },
    college: { // 所属学院
        type: String,
        trim: true,
        minlength: 1
    },
    username: { // 登录账号
        type: String,
        trim: true,
        minlength: 1
    },
    password: { // 登录密码，6~16 位数字字母，符号只可以使用 “_” 和 “.”。
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 16,
        match: /^[\w_.]{6,16}$/
    }
});

module.exports = mongoose.model('Teachers', teacherSchema, 'teachers');