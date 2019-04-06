// 引入 express
let express = require('express');
let router = express.Router();

// 引入第三方库
let extend = require('extend');
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let studentsModel = require('../model/students');
let teachersModel = require('../model/teachers');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('userManager');
});

/* GET users listing. */
router.post('/', function (req, res, next) {
    let data = [];
    studentsModel.find({}, (err, docs) => {
        if (err) {
            throw err;
        } else {
            return docs;
        }
    }).then((re) => {
        teachersModel.find({}, (err, docs) => {
            if (err) {
                throw err;
            } else {
                data = data.concat(re).concat(docs);
                res.json(data);
            }
        });
    });
});

module.exports = router;