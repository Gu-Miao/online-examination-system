let express = require('express');
let router = express.Router();

// 引入第三方库
let jsonParser = require('body-parser').json();
let app = express();
app.use(jsonParser);

// 引入数据库集合模型
let usersModel = require('../../model/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('userManagementLayer/new');
});

router.post('/', (req, res, next) => {
    usersModel.insertMany(req.body, (err) => {
        if(err) {
            console.log(err);
        } else {
            usersModel.find({}, (err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    res.json(docs);
                }
            });
        }
    });
});

module.exports = router;