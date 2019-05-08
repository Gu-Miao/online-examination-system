// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let examModel = require('../model/exams');
let paperModel = require('../model/papers');
let resultModel = require('../model/results');

// 获取主页
router.get('/', function (req, res) {
    res.render('exam');
});

router.post('/', function (req, res) {
    examModel.find({ eid: req.body.eid }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            const pid = docs[0].pid;
            paperModel.find({ pid: pid }, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(docs);
                }
            });
        }
    });
});

router.put('/', function (req, res) {
    let data = req.body;
    data.cmp = JSON.parse(data.cmp);
    data.sht = JSON.parse(data.sht);
    resultModel.insertMany(data, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;