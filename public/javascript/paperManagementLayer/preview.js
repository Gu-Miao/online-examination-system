const pid = getRequest(window.location.search).pid;
let ed = {};

$(function () {

    $('#exit').click(function(){
        window.location.href = '/paperManagement';
    });
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: { pid: pid },
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                ed = data[0];
                console.log(ed);
                render();
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

function render() {
    $paperName(ed).init();
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