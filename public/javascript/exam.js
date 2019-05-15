const uid = window.sessionStorage.eaxm_username;
const uname = window.sessionStorage.eaxm_name;
const eid = getRequest(window.location.search).eid;
let ed = {};

$(function () {

    $('#submit').click(submitLayer);
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: { eid: eid },
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                ed = data[0];
                console.log(ed);
                render();
                setInterval(function () {
                    if($('.time').html() == '00:00:00') {
                        clearInterval();
                        submit();
                        return;
                    }
                    $('.time').html(reduceTime($('.time').html()));
                }, 1 * 1000);
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

// 减少时间
function reduceTime(timeStr) {

    var hour = timeStr.split(':')[0];
    var min = timeStr.split(':')[1];
    var sec = timeStr.split(':')[2];

    if (hour === "00" && min === "05" && sec === "00") {
        infoy('距离考试结束还有5分钟，请抓紧时间！', 3 * 1000);
    }

    if (sec === "00") {
        if (min === "00") {
            if (hour === "00") {
                return false;
            } else {
                min = "59";
                sec = "59";
                hour = reduceNumStr(hour);
            }
        } else {
            sec = "59";
            min = reduceNumStr(min);
        }
    } else {
        sec = reduceNumStr(sec);
    }

    return hour + ":" + min + ":" + sec;
}

// 处理数字内容字符串
function reduceNumStr(numStr) {

    numStr = String(Number(--numStr));
    if (numStr.length <= 1) numStr = "0" + numStr;

    return numStr;
}

function render() {
    $paperName(ed).init();
    $examineeInfo.init();
    $singleChoise.init(ed.questions.sin)
    $multipleChoice.init(ed.questions.mut);
    $judgement.init(ed.questions.jug);
    $completion.init(ed.questions.bnk);
    $shortAnswer.init(ed.questions.sht);
    $comprehensive.init(ed.questions.cmp)
}

// 试卷名
let $paperName = function (ed) {
    let $dom = $(`<div class="exam_page_h1">${ed.name}</div>`);

    function init(name) {
        $dom.html(name);
        $('.exam_page').append($dom);
    }

    return {
        init: init
    }
}

// 考生信息
let $examineeInfo = function () {
    let $dom = $(`
        <div class="exam_page_block">
            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="exam_page_block_table">
                <tbody>
                    <tr>
                        <td width="20%" class="text-right">考生姓名：</td>
                        <td width="30%">${uname}</td>
                        <td width="20%" class="text-right">考试ID：</td>
                        <td width="30%">${uid}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `);

    function init() {
        $('.exam_page').append($dom);
    }

    return {
        init: init
    };
}();

// 单选题
let $singleChoise = function () {
    let $dom = $(`
        <div id="sin">
            <div class="exam_page_h2">
                <span class="glyphicon glyphicon-list-alt"></span> 
                <b class="red">单选题</b>
                <span></span>
            </div>
            <div class="exam_page_block"></div>
        </div
    `);

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div
    `);

    let $option = $(`
        <div class="radio">
            <label>
            <input type="radio" name="" value="">
            <span></span>
            </label>
        </div
    `);

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $dom.find('.exam_page_block').append($questionClone);

            for (let j = 0; j < data[i].options.length; ++j) {

                // 添加选项
                let $optionClone = $option.clone();
                $optionClone.find('label input').attr({
                    value: i + 1,
                    name: `sin${i + 1}`
                });
                $optionClone.find('label span').html(data[i].options[j]);
                $dom.find('.exam_answer:eq(' + i + ')').append($optionClone);
            }
        }
        $('.exam_page').append($dom);
    }

    return {
        init: init
    };

}();

// 多选题
let $multipleChoice = function () {

    let $dom = $(`
        <div id="mut">
            <div class="exam_page_h2">
                <span class="glyphicon glyphicon-list"></span>
                <b class="red">多选题</b>
                <span></span>
                </div>
            <div class="exam_page_block"></div>
        </div>
    `);

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div>
    `);

    let $option = $(`
        <div class="checkbox">
            <label>
            <input type="checkbox" value="">
            <span></span>
            </label>
        </div
    `);

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $questionClone.attr("name", `mut${i + 1}`);
            $dom.find('.exam_page_block').append($questionClone);

            for (let j = 0; j < data[i].options.length; ++j) {

                // 添加选项
                let $optionClone = $option.clone();
                $optionClone.find('label input').attr("value", `${j + 1}`);
                $optionClone.find('label span').html(data[i].options[j]);
                $dom.find('.exam_answer:eq(' + i + ')').append($optionClone);
            }
        }
        $('.exam_page').append($dom);
    }

    return {
        init: init
    }

}();

// 判断题
let $judgement = function () {

    let $dom = $(`
       <div id="jug">
        <div class="exam_page_h2">
            <span class="glyphicon glyphicon-check"></span>
            <b class="red">判断题</b>
            <span></span>
        </div>
        <div class="exam_page_block"></div>
       </div>
    `);

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div>
    `);

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $questionClone.attr("name", `jug${i + 1}`);
            $dom.find('.exam_page_block').append($questionClone);

            let $option = $(`
                <label class="radio-inline">
                    <input type="radio" name="jug${i + 1}" value="0">
                    <span>错误</span>
                </label>
                <label class="radio-inline">
                    <input type="radio" name="jug${i + 1}" value="1">
                    <span>正确</span>
                </label>
            `);

            $dom.find('.exam_answer:eq(' + i + ')').append($option);
        }
        $('.exam_page').append($dom);
    }

    return {
        init: init
    };
}();

// 填空题
let $completion = function () {

    let $dom = $(`
        <div id="bnk">
            <div class="exam_page_h2">
                <span class="glyphicon glyphicon-check"></span>
                <b class="red">填空题</b>
                <span></span>
            </div>
            <div class="exam_page_block"></div>
        </div>
    `)

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div>
    `);

    let $option = $('<input class="line_input" type="text" name=""><span> ， </span>');

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $questionClone.attr("name", `bnk${i + 1}`);
            $dom.find('.exam_page_block').append($questionClone);
            $dom.find('.exam_answer:eq(' + i + ')').prepend($('<span>答案：</span>'));

            let aa = data[i].answer.split('$$$');
            for (let j = 0; j < aa.length; ++j) {

                // 添加选项
                let $optionClone = $option.clone();

                if (j == aa.length - 1) $($optionClone[1]).html("。");
                $dom.find('.exam_answer:eq(' + i + ')').append($optionClone);
            }
        }
        $('.exam_page').append($dom);
    }

    return {
        init: init
    };
}();

// 简答题
let $shortAnswer = function () {

    let $dom = $(`
        <div id="sht">
            <div class="exam_page_h2">
                <span class="glyphicon glyphicon-edit"></span>
                <b class="red">简答题</b>
                <span></sapn>
            </div>
            <div class="exam_page_block"></div>
        </div>
    `)

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div>
    `);

    let $option = $('<textarea class="form-control"></textarea>');

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $questionClone.attr("name", `sht${i + 1}`);
            $dom.find('.exam_page_block').append($questionClone);

            // 添加选项
            let $optionClone = $option.clone();
            $dom.find('.exam_answer:eq(' + i + ')').append($optionClone);
        }
        $('.exam_page').append($dom);
    }

    return {
        init: init
    };
}();

// 综合题
let $comprehensive = function () {
    let $dom = $(`
        <div id="cmp">
            <div class="exam_page_h2">
                <span class="glyphicon glyphicon-list-alt"></span> 
                <b class="red">综合题</b>
                <span></span>
            </div>
            <div class="exam_page_block"></div>
        </div>
    `);

    let $question = $(`
        <div class="exam_one_question">
            <div class="exam_subject"></div>
            <div class="exam_answer"></div>
        </div>
    `);

    // 初始化
    function init(data) {
        if (!data) return;
        $dom.find('.exam_page_h2 span:eq(1)').html('共' + data.length + '题');

        for (let i = 0; i < data.length; ++i) {

            // 添加题目
            let $questionClone = $question.clone();
            $questionClone.addClass('cmpc')
            $questionClone.find('.exam_subject').html(i + 1 + "." + data[i].content + ' （' + data[i].score + '分）');
            $dom.find('.exam_page_block').append($questionClone);

            for (let j = 0; j < data[i].smallQuestions.length; ++j) {

                let sd = data[i].smallQuestions[j];
                let type = sd.type;
                let $qdom = null;
                if (type == 0) {
                    $qdom = crsin(sd, i, j + 1);
                } else if (type == 1) {
                    $qdom = crmut(sd, i, j + 1);
                } else if (type == 2) {
                    $qdom = crjug(sd, i, j + 1);
                } else if (type == 3) {
                    $qdom = crbnk(sd, i, j + 1);
                } else if (type == 4) {
                    $qdom = crsht(sd, i, j + 1);
                }
                $questionClone.find('.exam_answer').eq(i).append($qdom);
            }
        }
        $('.exam_page').append($dom);
    }

    function crsin(data, no, sn) {
        let $option = $(`
            <div class="radio">
                <label>
                <input type="radio" name="" value="">
                <span></span>
                </label>
            </div
        `);
        let $qc = $question.clone(); $qc.attr('data-type', data.type);
        $qc.find('.exam_subject').html(`（${sn}）${data.content}`);
        for (let i = 0; i < data.options.length; ++i) {
            let $optionClone = $option.clone();
            $optionClone.find('label input').attr({
                value: i + 1,
                name: `csin${no}`
            });
            $optionClone.find('label span').html(data.options[i]);
            $qc.find('.exam_answer').append($optionClone);
        }

        return $qc;
    }
    function crmut(data, no, sn) {
        let $option = $(`
            <div class="checkbox">
                <label>
                <input type="checkbox" value="">
                <span></span>
                </label>
            </div
        `);
        let $qc = $question.clone(); $qc.attr('data-type', data.type);
        $qc.find('.exam_subject').html(`（${sn}）${data.content}`);
        for (let i = 0; i < data.options.length; ++i) {
            let $optionClone = $option.clone();
            $optionClone.find('label input').attr({
                value: i + 1,
                name: `cmut${no}`
            });
            $optionClone.find('label span').html(data.options[i]);
            $qc.find('.exam_answer').append($optionClone);
        }

        return $qc;
    }
    function crjug(data, no, sn) {
        let $qc = $question.clone(); $qc.attr('data-type', data.type);
        $qc.find('.exam_subject').html(`（${sn}）${data.content}`);
        $qc.find('.exam_answer').append($(`
            <label class="radio-inline">
                <input type="radio" name="cjug${no}" value="0">
                <span>错误</span>
            </label>
            <label class="radio-inline">
                <input type="radio" name="cjug${no}" value="1">
                <span>正确</span>
            </label>
        `));

        return $qc;
    }
    function crbnk(data, no, sn) {
        let $option = $('<input class="line_input" type="text" name=""><span> ， </span>');
        let $qc = $question.clone(); $qc.attr('data-type', data.type);
        $qc.find('.exam_answer').prepend($('<span>答案：</span>'));
        $qc.find('.exam_subject').html(`（${sn}）${data.content}`);

        let aa = data.answer.split('$$$');
        for (let i = 0; i < aa.length; ++i) {

            let $optionClone = $option.clone();

            if (i == aa.length - 1) $($optionClone[1]).html("。");
            $qc.find('.exam_answer').append($optionClone);
        }

        return $qc;
    }
    function crsht(data, no, sn) {
        let $qc = $question.clone(); $qc.attr('data-type', data.type);
        $qc.find('.exam_answer').append('<textarea class="form-control"></textarea>');
        $qc.find('.exam_subject').html(`（${sn}）${data.content}`);

        return $qc;
    }

    return {
        init: init
    };

}();

// 交卷提示
function submitLayer() {
    cony('确定交卷吗？', submit);
}

// 交卷
function submit() {

    let data = {
        cmp: [],
        uid: uid,
        eid: eid,
        res: 0,
        name: ed.name
    };

    // 获取考生答案
    let q = getAnswer();

    // 自动评分
    data.score = getMark(q);

    for (let i = 0; i < ed.questions.sht.length; ++i) {
        ed.questions.sht[i].examInput = q.sht[i];
    }
    data.sht = ed.questions.sht;

    for (let i = 0; i < ed.questions.cmp.length; ++i) {
        let cmp = ed.questions.cmp[i];
        for (let j = 0; j < cmp.smallQuestions.length; ++j) {
            let cmps = cmp.smallQuestions[j];
            if (cmps.type == 4) {
                cmps.examInput = q.cmp[i][j];
                data.cmp.push(cmps);
            }
        }
    }

    console.log('data', data);
    data.cmp = JSON.stringify(data.cmp);
    data.sht = JSON.stringify(data.sht);

    loadingy();
    $.ajax({
        type: "put",
        url: window.location.pathname,
        data: data,
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                window.location.href = '/studentHome';
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

// 获取考生答案
function getAnswer() {
    let data = {
        sin: [],
        mut: [],
        jug: [],
        bnk: [],
        sht: [],
        cmp: []
    }

    for (let i = 0; i < $('#sin .exam_one_question').length; ++i) {
        let val = $(`#sin .exam_one_question:eq(${i}) input:checked`).val();
        if (val) {
            data.sin[i] = val;
        } else {
            data.sin[i] = "";
        }
    }

    for (let i = 0; i < $('#mut .exam_one_question').length; ++i) {
        let $val = $(`#mut .exam_one_question:eq(${i}) input:checked`);
        let val = '';
        if ($val) {
            for (let j = 0; j < $val.length; ++j) {
                val += $val.eq(j).val();
            }
        }
        data.mut[i] = val;
    }

    for (let i = 0; i < $('#jug .exam_one_question').length; ++i) {
        let val = $(`#jug .exam_one_question:eq(${i}) input:checked`).val();
        if (val) {
            data.jug[i] = val;
        } else {
            data.jug[i] = "";
        }
    }

    for (let i = 0; i < $('#bnk .exam_one_question').length; ++i) {
        let $val = $(`#bnk .exam_one_question:eq(${i}) .line_input`);
        let val = [];
        for (let j = 0; j < $val.length; ++j) {
            val.push($val.eq(j).val());
        }
        data.bnk[i] = val.join('$$$');
    }

    for (let i = 0; i < $('#sht .exam_one_question').length; ++i) {
        data.sht[i] = $(`#sht .exam_one_question:eq(${i}) textarea`).val();
    }

    for (let i = 0; i < $('#cmp .cmpc').length; ++i) {
        data.cmp[i] = [];
        for (let j = 0; j < $('#cmp .cmpc').eq(i).find('.exam_one_question').length; ++j) {
            let $q = $('#cmp .cmpc').eq(i).find('.exam_one_question').eq(j);
            let type = $q.attr('data-type');
            if (type == 0) {
                let val = $q.find(`input:checked`).val();
                if (val) {
                    data.cmp[i][j] = val;
                } else {
                    data.cmp[i][j] = "";
                }
            } else if (type == 1) {
                let $val = $q.find(`input:checked`);
                let val = '';
                if ($val) {
                    for (let k = 0; k < $val.length; ++k) {
                        val += $val.eq(k).val();
                    }
                }
                data.cmp[i][j] = val;
            } else if (type == 2) {
                let val = $q.find(`input:checked`).val();
                if (val) {
                    data.cmp[i][j] = val;
                } else {
                    data.cmp[i][j] = "";
                }
            } else if (type == 3) {
                let $val = $q.find(`.line_input`);
                let val = [];
                for (let k = 0; k < $val.length; ++k) {
                    val.push($val.eq(k).val());
                }
                data.cmp[i][j] = val.join('$$$');
            } else if (type == 4) {
                data.cmp[i][j] = $q.find(`textarea`).val();
            }
        }
    }

    console.log(data);
    return data;
}

// 计算得分
function getMark(q) {
    let questions = ed.questions;
    let tA = ['sin', 'mut', 'jug', 'bnk', 'cmp'];
    let score = 0;
    for (let i = 0; i < tA.length; ++i) {
        let qesA = questions[tA[i]];
        for (let j = 0; j < qesA.length; ++j) {
            if (qesA[j].type != 5) {
                let answer = q[tA[i]][j];
                if (answer == qesA[j].answer) score += Number(qesA[j].score);
            } else {
                for (let k = 0; k < qesA[j].smallQuestions.length; ++k) {
                    let qq = qesA[j].smallQuestions[k];
                    if (qq.type == 4) continue;

                    let answer = q.cmp[j][k];
                    if (answer == qq.answer) score += Number(qq.score);
                }
            }
        }
    }

    console.log('score', score);
    return score;
}