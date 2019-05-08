// 引入 Mongoose
let mongoose = require('./connect');

// 定义学生集合数据结构
let ResultsSchema = new mongoose.Schema({
    name: { //考试名
        type: String,
        trim: true
    },
    uid: { // 用户ID
        type: String,
        trim: true
    },
    eid: { // 考试ID
        type: String,
        trim: true
    },
    sht: [{
        content: { // 题干
            type: String,
            trim: true
        },
        qid: { // 题目ID
            type: String,
            trim: true
        },
        type: { // 题目类型
            type: Number,
            trim: true
        },
        options: [String],
        smallQuestions: [],
        answer: { // 问题答案
            type: String,
            trim: true,
        },
        score: { // 分数
            type: Number,
            trim: true,
        },
        examInput: {
            type: String,
            trim: true,
        }
    }],
    cmp: [{
        content: { // 题干
            type: String,
            trim: true
        },
        qid: { // 题目ID
            type: String,
            trim: true
        },
        type: { // 题目类型
            type: Number,
            trim: true
        },
        options: [String],
        smallQuestions: [],
        answer: { // 问题答案
            type: String,
            trim: true,
        },
        score: { // 分数
            type: Number,
            trim: true,
        },
        examInput: {
            type: String,
            trim: true,
        }
    }],
    res: { //是否已阅
        type: Number,
        trim: true
    },
    score: {
        type: Number,
        trim: true
    }

}, { versionKey: false });

module.exports = mongoose.model('Results', ResultsSchema, 'results');