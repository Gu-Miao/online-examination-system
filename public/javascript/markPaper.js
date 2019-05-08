const uid = getRequest(window.location.search).uid;
const eid = getRequest(window.location.search).eid;
let ed = {};

$(function () {
    $('#submit').click(submit);
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: { uid: uid, eid: eid },
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                ed = data[0];
                ed.questions = [];
                for (let i = 0; i < ed.cmp.length; ++i) {
                    ed.questions.push(ed.cmp[i]);
                }
                for (let i = 0; i < ed.sht.length; ++i) {
                    ed.questions.push(ed.sht[i]);
                }
                console.log(ed);
                $markQuestion.init(ed);
                layer.closeAll();
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('加载失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
});

/*
** 评卷面板组件
** @$markQuestionListItem   { String }      面板DOM
** @init                    { Function }    初始化的方法
** @data                    { Object }      初始化方法调用的参数，从接口获取
*/
let $markQuestion = function () {

    function init(data) {
        for (let i = 0; i < data.questions.length; ++i) {

            let q = data.questions[i];
            let $markQuestionListItem = $(`
                <div class="mark-paper">
                    <div class="row">
                        <div class="col-12">
                            <div class="block_title">
                                <span class="name">问题${ConvertIntNumberToChinese(i + 1)} （${q.score}分）</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <label>问题：</label>
                        <div class="col-12">
                            <textarea class="form-control" readonly>${q.content}</textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>考生答案：</label>
                        <div class="col-12">
                            <textarea class="form-control" readonly>${q.examInput}</textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>参考答案：</label>
                        <div class="col-12">
                            <textarea class="form-control" readonly>${q.answer}</textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>评分：</label>
                        <div class="col-4">
                            <input class="form-control" type="number" min="0" max="${q.score}" step="1">
                        </div>
                    </div>
                </div
            `);

            $markQuestionListItem.find('[type="number"]').keyup(function () {
                if (Number($(this).val()) > q.score) $(this).val(q.score);
            }).change(function () {
                if (Number($(this).val()) > q.score) $(this).val(q.score);
            }).blur(function() {
                if (Number($(this).val()) > q.score) $(this).val(q.score);
            });
            $('.container-fluid .row:eq(0) div:eq(0)').append($markQuestionListItem);
        }
    }

    return {
        init: init
    };
}();

// 点击暂存按钮的回调函数
function submit() {
    let data = {
        eid: eid,
        uid: uid,
        res: 1,
        score: ed.score
    };

    for (let i = 0; i < $('input[type="number"]').length; ++i) {
        data.score += Number($('input[type="number"]').eq(i).val());
    }

    $.ajax({
        type: "put",
        url: window.location.pathname,
        data: submit,
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                window.location.pathname = '/mark'
                layer.closeAll();
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('加载失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
    
}

/*
** 将整数转换为汉字
** @section     { Number, String }      传入的整数，可以是字符串或者数字类型
** @return      { String }              转化成的汉字
*/
function ConvertIntNumberToChinese(section) {
    section = Number(section);
    let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    let chnUnitChar = ["", "十", "百", "千"];
    let strIns = '', chnStr = '';
    let unitPos = 0;
    let zero = true;
    while (section > 0) {
        let v = section % 10;
        if (v === 0) {
            if (!zero) {
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        } else {
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}