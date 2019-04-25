// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let usersModel = require('../model/users');
let managersModel = require('../model/managers');

// 获取主页
router.get('/', function (req, res) {
    res.render('index');
});

// 登录请求
router.post('/', function (req, res) {
    console.log(req.body);
    // 0 登录成功，1 用户名不存在，2 密码错误，3 登录请求失败
    switch (Number(req.body.userType)) {
        case 0:
            studentLogin(req.body, res);
            return;
        case 1:
            teacherLogin(req.body, res);
            return;
        case 2:
            managerLogin(req.body, res);
            return;
        default:
            res.send('3');
            return;
    }
});

// 学生登录
let studentLogin = (data, res) => {
    usersModel.find({ username: data.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return '3';
        } else {
            if (doc.length === 0) {
                res.send('1')
                return;
            } else if (doc[0].password === data.password) {
                res.json(doc[0].name);
                return;
            } else {
                res.send('2');
                return;
            }
        }
    });
}

// 教师登录
let teacherLogin = (data, res) => {
    usersModel.find({ username: data.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return '3';
        } else {
            if (doc.length === 0) {
                res.send('1')
                return;
            } else if (doc[0].password === data.password) {
                res.json(doc[0].name);
                return;
            } else {
                res.send('2');
                return;
            }
        }
    });
}

// 管理员登录
let managerLogin = (data, res) => {
    managersModel.find({ username: data.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return '3';
        } else {
            if (doc.length === 0) {
                res.send('1')
                return;
            } else if (doc[0].password === data.password) {
                res.json(doc[0].name);
                return;
            } else {
                res.send('2');
                return;
            }
        }
    });
}

module.exports = router;
