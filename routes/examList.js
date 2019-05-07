// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let examModel = require('../model/exams');

// 获取主页
router.get('/', function (req, res) {
    res.render('examList');
});

router.post('/', function (req, res) {
    examModel.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;