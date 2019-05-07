// 加载模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');

// 加载路由
var indexRouter = require('./routes/index');
var teacherHomeRouter = require('./routes/teacherHome');
var studentHomeRouter = require('./routes/studentHome');
var managerHomeRouter = require('./routes/managerHome');
var userManagementRouter = require('./routes/userManagement');
var questionManagementRouter = require('./routes/questionManagement');
var paperManagementRouter = require('./routes/paperManagement');
var examManagementRouter = require('./routes/examManagement');
var examListRouter = require('./routes/examList');
var examRouter = require('./routes/exam');

// layer路由
var userManagementNewRouter = require('./routes/userManagementLayer/new');
var userManagementPreviewRouter = require('./routes/userManagementLayer/preview');
var userManagementChangeRouter = require('./routes/userManagementLayer/change');
var questionManagementNewRouter = require('./routes/questionManagementLayer/new');
var questionManagementPreviewRouter = require('./routes/questionManagementLayer/preview');
var questionManagementChangeRouter = require('./routes/questionManagementLayer/change');
var paperManagementNewRouter = require('./routes/paperManagementLayer/new');
var paperManagementPreviewRouter = require('./routes/paperManagementLayer/preview');
var paperManagementChangeRouter = require('./routes/paperManagementLayer/change');
var examManagementNewRouter = require('./routes/examManagementLayer/new');
var examManagementPreviewRouter = require('./routes/examManagementLayer/preview');
var examManagementChangeRouter = require('./routes/examManagementLayer/change');

var app = express();

// 注册模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 注册中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// 注册路由
app.use('/', indexRouter);
app.use('/teacherHome', teacherHomeRouter);
app.use('/studentHome', studentHomeRouter);
app.use('/managerHome', managerHomeRouter);
app.use('/userManagement', userManagementRouter);
app.use('/questionManagement', questionManagementRouter);
app.use('/paperManagement', paperManagementRouter);
app.use('/examManagement', examManagementRouter);
app.use('/examList', examListRouter);
app.use('/exam', examRouter);

// layer 路由
app.use('/userManagementNew', userManagementNewRouter);
app.use('/userManagementPreview', userManagementPreviewRouter);
app.use('/userManagementChange', userManagementChangeRouter);
app.use('/questionManagementNew', questionManagementNewRouter);
app.use('/questionManagementPreview', questionManagementPreviewRouter);
app.use('/questionManagementChange', questionManagementChangeRouter);
app.use('/paperManagementNew', paperManagementNewRouter);
app.use('/paperManagementPreview', paperManagementPreviewRouter);
app.use('/paperManagementChange', paperManagementChangeRouter);
app.use('/examManagementNew', examManagementNewRouter);
app.use('/examManagementPreview', examManagementPreviewRouter);
app.use('/examManagementChange', examManagementChangeRouter);

// 捕获404并转发到错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;