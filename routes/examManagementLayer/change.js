let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let examModel = require('../../model/exams');
let courseModel = require('../../model/courses');

/* GET exam listing. */
router.get('/', function (req, res, next) {
    res.render('examManagementLayer/change');
});

router.post('/', (req, res, next) => {
    examModel.find({ eid: req.body.eid }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docs)
            res.json(docs);
        }
    });
});

router.put('/', (req, res, next) => {
    examModel.updateOne({ eid: req.body.preid }, req.body, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            examModel.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(docs)
                    res.json(docs);
                }
            });
        }
    })
});

module.exports = router;