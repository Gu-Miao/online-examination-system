// 引入 Mongoose
let mongoose = require('./connect');

// 定义问题集合数据结构
let QuestionSchema = new mongoose.Schema({
    content: { // 题干
        type: String,
        trim: true,
        minlength: 1,
    },
    qid: { // 题目ID
        type: String,
        trim: true,
        minlength: 1
    },
    type: { // 题目类型
        type: Number,
        trim: true,
        minlength: 1
    },
    options: [String],
    smallQuestions: [{
        content: { // 题干
            type: String,
            trim: true,
            minlength: 1,
        },
        type: { // 题目类型
            type: Number,
            trim: true,
            minlength: 1
        },
        options: [String],
        answer: { // 问题答案
            type: String,
            trim: true,
        },
        resources: { // 额外资源
            type: String,
            trim: true
        }
    }],
    answer: { // 问题答案
        type: String,
        trim: true,
    },
    resources: { // 额外资源
        type: String,
        trim: true
    }
}, { versionKey: false });

let Questions = mongoose.model('Questions', QuestionSchema, 'questions');

module.exports = Questions;