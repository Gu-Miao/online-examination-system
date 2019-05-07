// 引入 Mongoose
let mongoose = require('./connect');

// 定义学生集合数据结构
let CourseSchema = new mongoose.Schema({
    name: { // 课程名
        type: String,
        trim: true
    },
    cid: { // 课程ID
        type: String,
        trim: true
    },
    optime: { // 开课时间
        type: String,
        trim: true
    },
    college: { // 所属学校
        type: String,
        trim: true
    },
    teacher: {
        type: String,
        trim: true
    },
    students: [String]
}, { versionKey: false });

module.exports = mongoose.model('Courses', CourseSchema, 'courses');