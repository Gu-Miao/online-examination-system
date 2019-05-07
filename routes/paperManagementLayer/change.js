let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let paperModel = require('../../model/papers');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('paperManagementLayer/change');
});

router.post('/', (req, res, next) => {
    paperModel.find({ pid: req.body.pid }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

router.put('/', (req, res, next) => {
    let data = req.body;
    data.questions = JSON.parse(data.questions);
    console.dir(data);
    paperModel.updateOne({ pid: data.pid }, data, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});


module.exports = router;