// 引入 Mongoose
let mongoose = require('./connect');

// 定义学生集合数据结构
let ExamSchema = new mongoose.Schema({
    cname: { // 考试课程名称
        type: String,
        trim: true
    },
    eid: { // 考试ID
        type: String,
        trim: true
    },
    cid: { // 课程ID
        type: String,
        trim: true,
        minlength: 1
    },
    pid: { // 试卷ID
        type: String,
        trim: true
    },
    data: { // 试卷ID
        type: String,
        trim: true
    },
    time: { // 试卷ID
        type: String,
        trim: true
    },
    students: [String]
}, { versionKey: false });

module.exports = mongoose.model('Exams', ExamSchema, 'exams');