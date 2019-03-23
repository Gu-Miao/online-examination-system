# 题目

## 属性

```js
{
    "answer": "", // 问题的答案，只有单选，多选，判断，填空有，简答题和综合题不给出答案，答案格式 0, 1, 2, 3 代表选项顺序
    "belong": "", // 属于哪个题库
    "content": "", // 题目内容
    "createTime": null, // 创建时间
    "id": "", // 题目 id
    "keywords": "", // 关键字，用于搜索
    "lastModifiedTime": null, // 最后一次修改的时间
    "option": { // 选项
        "questionOptionLength": 0, // 选项个数
        "questionOptions": [ // 选项数组
            {
                "content": "", // 选项内容
                "isRight": false, // 是否是正确的
                "order": 0 // 选项在问题中的顺序
            }
        ]
    },
    "resources": [ // 题目中可能用到的图片，音频资源
        {
            "type": "", // 在资源类型:图片，音频，视频
            "url": "" // 服务器地址
        }
    ]
    "smallQuestion": { // 小问，仅当题目类型为综合题时才有的属性
        "samllQuestionLength": 0, // 小问个数
        "smallQuestions": [ // 小问数组
            {
                "content": "", // 小问内容
                "option": { // 当小问是选择题时，比如英语阅读理解
                    "questionOptionLength": 0, // 选项个数
                    "questionOptions": [ // 选项数组
                        {
                            "content": "", // 选项内容
                            "isRight": false, // 是否是正确的
                            "order": 0 // 选项在问题中的顺序
                        }
                    ]
                },
                "score": 0 // 小问分数
            }
        ]
    },
    "type": "" // 题目类型：单选题，多选题，判断题，填空题，简答题，综合题
}
```

