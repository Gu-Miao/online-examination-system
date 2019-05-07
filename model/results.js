// 引入 Mongoose
let mongoose = require('./connect');

// 定义学生集合数据结构
let ResultsSchema = new mongoose.Schema({
    uid: { // 用户名
        type: String,
        trim: true
    },
    pid: { // 试卷ID
        type: String,
        trim: true
    },
    fullMark: { // 登录密码，6~16 位数字字母，符号只可以使用 “_” 和 “.”。
        type: Number,
        trim: true
    },
    questions: {
        sin: [{
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
            score:{ // 分数
                type: Number,
                trim: true,
            }
        }],
        mut: [{
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
            score:{ // 分数
                type: Number,
                trim: true,
            }
        }],
        jug: [{
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
            score:{ // 分数
                type: Number,
                trim: true,
            }
        }],
        bnk: [{
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
            score:{ // 分数
                type: Number,
                trim: true,
            }
        }],
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
            score:{ // 分数
                type: Number,
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
            smallQuestions: [{
                content: { // 题干
                    type: String,
                    trim: true
                },
                type: { // 题目类型
                    type: Number,
                    trim: true
                },
                options: [String],
                answer: { // 问题答案
                    type: String,
                    trim: true,
                },
                score:{ // 分数
                    type: Number,
                    trim: true,
                }
            }],
            answer: { // 问题答案
                type: String,
                trim: true,
            },
            score:{ // 分数
                type: Number,
                trim: true,
            }
        }]
    }
}, { versionKey: false });

module.exports = mongoose.model('Results', ResultsSchema, 'results');