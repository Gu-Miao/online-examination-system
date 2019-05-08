// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let resultModel = require('../model/results');

router.get('/', function (req, res, next) {
    res.render('markPaper');
});

router.post('/', function (req, res, next) {
    resultModel.find({ eid: req.body.eid, uid: req.body.uid }, (err, docs) => {
        if (err) {
            console.log('err: ', err);
        } else {
            res.json(docs);
        }
    });
});

router.put('/', function (req, res, next) {
    resultModel.updateOne({ eid: req.body.eid, uid: req.body.uid }, req.body, (err, docs) => {
        if (err) {
            console.log('err: ', err);
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;