let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let examModel = require('../../model/exams');

/* GET exam listing. */
router.get('/', function (req, res, next) {
    res.render('examManagementLayer/preview');
});

router.post('/', function (req, res, next) {
    examModel.find({ eid: req.body.eid }, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;