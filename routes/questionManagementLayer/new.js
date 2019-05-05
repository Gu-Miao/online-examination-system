let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let questionsModel = require('../../model/questions');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('questionManagementLayer/new');
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    let data = req.body;
    data.options = JSON.parse(data.options);
    data.smallQuestions = JSON.parse(data.smallQuestions);
    questionsModel.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            data.qid = getForNum(docs.length + 1);
            questionsModel.insertMany(data, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    questionsModel.find({}, (err, docs) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(docs);
                        }
                    });
                }
            });
        }

    });
});

// 获取格式化的 ID
function getForNum(number) {
    let leng = number;
    let id = String(leng);
    let len = id.length;

    for (len; len < 9; ++len) {
        id = '0' + id;
    }

    return id;
}

module.exports = router;