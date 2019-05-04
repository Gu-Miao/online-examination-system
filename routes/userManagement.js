// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let usersModel = require('../model/users');

router.get('/', function (req, res, next) {
    res.render('userManagement');
});

router.post('/', function (req, res, next) {
    var reqData = JSON.parse(JSON.stringify(req.body));
    if (reqData.search) {
        reqData = JSON.parse(reqData.search);
        console.log(reqData)
    }

    usersModel.find(reqData, (err, docs) => {
        if (err) {
            console.log('err: ', err);
        } else {
            // console.log(docs);
            res.json(docs);
        }
    });
});

router.delete('/', function (req, res, next) {
    // console.log(req.body, typeof req.body);
    usersModel.deleteOne({ uid: req.body.uid }, (err, docs) => {
        if (err) {
            throw err;
        } else {
            console.log(docs);
            res.json(docs);
        }
    });
});

module.exports = router;