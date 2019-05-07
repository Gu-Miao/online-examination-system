$(function () {

    // 添加问题按钮事件
    $('.addq').click(function () {
        let $this = $(this);
        const $dom = $this.parent().parent().find('.exam_page_block');
        const id = $this.parent().parent().attr('id');
        let type;
        if (id == 'sin') {
            type = 0;
        } else if (id == 'mut') {
            type = 1;
        } else if (id == 'jug') {
            type = 2;
        } else if (id == 'bnk') {
            type = 3;
        } else if (id == 'sht') {
            type = 4;
        } else {
            type = 5;
        }

        layer.open({
            type: 1,
            title: '新增题目',
            content: `
                <p>选择添加方式</p>
                <select class="form-control" id="addt">
                    <option value="0">题库获取</option>
                    <option value="1">自定义</option>
                </select>
            `,
            btnAlign: 'c',
            area: ['200px', '200px'],
            btn: ["确定", "取消"],
            success: function ($layer, index) {
                $layer.find('.layui-layer-content').css('padding', '.75rem');
            },
            yes: function (index) {
                layer.close(index);

                if (Number($('#addt').val())) { // 自定义

                    // 渲染页面
                    render(type, $dom, false);
                } else { // 题库选择

                    layer.closeAll();
                    layer.open({
                        type: 2,
                        title: ['浏览题库', "font-size: 16px;"],
                        content: '/questionManagement?layer=true',
                        area: ['700px', '520px'],
                        shade: 0,
                        moveOut: true
                    });

                    // 渲染页面
                    render(type, $dom, true);
                }
            }
        });
    });

    // 提交和退出
    $('#submit').click(function () {
        submit();
    });
    $('#exit').click(function () {
        window.location.pathname = '/paperManagement';
    });
});

// 渲染页面
function render(type, $dom, isFromLib, isCmp) {
    let _isCmp = isCmp || false;

    if (_isCmp) {
        if (type == 0) {
            newSin($dom);
        } else if (type == 1) {
            newMult($dom);
        } else if (type == 2) {
            newJug($dom);
        } else if (type == 3) {
            newBlank($dom);
        } else if (type == 4) {
            newShort($dom);
        } else if (type == 5) {
            newCom($dom);
        } else {
            erry('题目类型错误', 2000);
        }

        return;
    }
    const qcl = $('.qc').length + 1;
    const ql = $dom.find('.qc').length + 1;
    let $qc = $(`
        <div id="qcl${qcl}" class="qc m-3 rounded">
            <div class="card">
                <div class="card-header">
                    <button class="btn btn-link c" data-toggle="collapse" data-target="#qclc${qcl}">
                        第${ql}题
                    </button>
                    <button class="btn btn-link float-right text-danger">删除</button>
                </div>
                <div id="qclc${qcl}" class="collapse" data-parent="#qcl${qcl}">
                    <div class="card-body">
                    </div>
                </div>
            </div>
        </div>
    `);

    $qc.find('.text-danger').click(function () {
        $('#fullMark').val(getFullMark());
        $(this).parent().parent().parent().remove();
        for (let i = 0; i < $('.qc').length; ++i) {
            let $qcl = $('.qc').eq(i);
            const qcl = i + 1;
            const ql = $qcl.index() + 1;
            $qcl.attr('id', qcl);
            $qcl.find('.c').attr('data-target', `#qclc${qcl}`).html(`第${ql}题`);
            $qcl.find('.collapse').attr('id', `qclc${qcl}`).attr('data-parent', `#qcl${qcl}`);
        }
    });

    $dom.append($qc);
    let $qcb = $qc.find('.card-body');

    if (isFromLib) {
        $qcb.append(`
            <div class="form-group col-12">
                <label>题目ID</label>
                <input type="text" class="form-control" placeholder="请输入正确的题目ID">
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
        `);
        $qcb.find('.score').change(function() {
            $('#fullMark').val(getFullMark());
        });
        $qc.addClass('fromlib');
    } else {
        if (type == 0) {
            newSin($qcb);
        } else if (type == 1) {
            newMult($qcb);
        } else if (type == 2) {
            newJug($qcb);
        } else if (type == 3) {
            newBlank($qcb);
        } else if (type == 4) {
            newShort($qcb);
        } else if (type == 5) {
            newCom($qcb);
        } else {
            erry('题目类型错误', 2000);
        }
    }
}

// 单选题
function newSin($root) {

    let $dom = $(`
        <div class="col-12 form-row">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-6">
                <label>正确答案</label>
                <input type="number" class="answer form-control" min="1" step="1">
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
            <div class="form-group col-12">
                <button class="addop btn btn-primary form-control w-100">添加选项</button>
            </div>
        </div>
    `);

    $dom.find('.addop').click(function () {
        let $dom1 = $(`
            <div class="form-group col-12">
                <label>选项${$dom.find('.op').length + 1}</label>
                <span class="badge badge-pill badge-danger float-right">删除</span>
                <input type="text" class="form-control op">
            </div>
        `);
        $dom1.find('.badge').click(function () {
            $dom1.remove();
            const op_count = $dom.find('.op').length;
            if ($dom.find('.answer').val() > op_count) $dom.find('.answer').val('');
            $dom.find('.answer').prop('max', op_count);
            for (let i = 0; i < op_count; ++i) {
                $dom.find('.op').eq(i).parent().find('label').html(`选项${i + 1}`);
            }
        });
        $dom.find('.addop').parent().before($dom1);
        const op_count = $dom.find('.op').length;
        if ($dom.find('.answer').val() > op_count) $dom.find('.answer').val('');
        $dom.find('.answer').prop('max', op_count);
    });
    $dom.find('.answer').blur(function () {
        const op_count = $dom.find('.op').length;
        if ($(this).val() > op_count) $(this).val('');
        $(this).prop('max', op_count);
    });
    $dom.find('.score').change(function(){
        $('#fullMark').val(getFullMark());
    });

    $root.append($dom);
}

// 多选题
function newMult($root) {

    let $dom = $(`
        <div class="form-row">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-12">
                <button class="addop btn btn-primary form-control w-100">添加选项</button>
            </div>
            <div class="form-group col-12">
                <p>正确答案<p>
                <div class="ac form-group"></div>
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
        </div>
    `);
    $dom.find('.addop').click(function () {
        let $dom1 = $(`
            <div class="form-group col-12">
                <label>选项${$dom.find('.op').length + 1}</label>
                <span class="badge badge-pill badge-danger float-right">删除</span>
                <input type="text" class="form-control op">
            </div>
        `);
        $dom1.find('.badge').click(function () {
            $dom1.remove();
            $dom.find('.ac .form-check-inline:last').remove();
            for (let i = 0; i < $('.op').length; ++i) {
                $dom.find('.op').eq(i).parent().find('label').html(`选项${i + 1}`);
            }
        });
        $dom.find('.addop').parent().before($dom1);
        $dom.find('.ac').append($(`
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="${$dom.find('.op').length}" name="op">
                <label class="form-check-label">${$dom.find('.op').length}</label>
            </div>
        `));
    });

    $dom.find('.score').change(function(){
        $('#fullMark').val(getFullMark());
    });

    $root.append($dom);
}

// 判断题
function newJug($root) {

    let $dom = $(`
        <div class="form-row">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-6">
                <label>正确答案</label>
                <select class="form-control answer">
                    <option value="0">错误</option>
                    <option value="1">正确</option>
                </select>
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
        </div>
    `);

    $dom.find('.score').change(function(){
        $('#fullMark').val(getFullMark());
    });

    $root.append($dom);
}

// 填空题
function newBlank($root) {
    let $dom = $(`
        <div class="form-row">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-12">
                <label>正确答案</label>
                <input type="text" class="answer form-control">
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
        </div>
    `);
    $dom.find('.score').change(function(){
        $('#fullMark').val(getFullMark());
    });
    $root.append($dom);
    infoy('如果有多个空，填写答案时用三个美元号将答案隔开，如：“$$$”', 3000);
}

// 简答题
function newShort($root) {
    let $dom = $(`
        <div class="form-row">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-12">
                <label>正确答案</label>
                <input type="text" class="answer form-control">
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score form-control" min="0.1" step="1" max="999">
            </div>
        </div>
    `);

    $dom.find('.score').change(function(){
        $('#fullMark').val(getFullMark());
    });

    $root.append($dom);
}

// 综合题
function newCom($root) {

    let $dom = $(`
        <div class="form-row">
            <div class="form-group col-12">
                <label>主题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-12 smc"></div>
            <div class="form-group col-12">
                <button class="addsm btn btn-primary form-control w-100">添加小问</button>
            </div>
            <div class="form-group col-6">
                <label>分数</label>
                <input type="number" class="score1 form-control" min="0.1" step="1" max="999" readonly>
            </div>
        </div>
    `);
    $dom.find('.addsm').click(function () {
        layer.open({
            type: 1,
            title: '请选择题目类型',
            content: `
                <select class="form-control" id="qtype">
                    <option value="0">单选题</option>
                    <option value="1">多选题</option>
                    <option value="2">判断题</option>
                    <option value="3">填空题</option>
                    <option value="4">简答题</option>
                </select>
            `,
            btnAlign: 'c',
            area: ['200px', '160px'],
            btn: ["确定", "取消"],
            success: function ($layer, index) {
                $layer.find('.layui-layer-content').css('padding', '.75rem');
            },
            yes: function (index) {
                layer.close(index);
                const sml = $dom.find('.card').length + 1;
                let $smcc = $(`
                    <div id="sm${sml}" class="smcc m-3 rounded" data-type="${$('#qtype').val()}">
                        <div class="card">
                            <div class="card-header">
                                <button class="btn btn-link c" data-toggle="collapse" data-target="#cl${sml}">
                                    小问${sml}
                                </button>
                                <button class="btn btn-link float-right text-danger">删除</button>
                            </div>
                            <div id="cl${sml}" class="collapse" data-parent="#sm${sml}">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $smcc.find('button.text-danger').click(function () {
                    $(this).parent().parent().parent().remove();
                    const sml = $dom.find('.card').length;
                    for (let i = 1; i <= sml; ++i) {
                        let $dom1 = $('.smcc').eq(i - 1);
                        $dom1.attr('id', `sm${i}`);
                        $dom1.find('button.c').html(`小问${i}`).attr('data-target', `#cl${i}`);
                        $dom1.find('.card-body').parent().attr('id', `cl${i}`).attr('data-parent', `#sm${i}`);
                    }
                    let score1 = 0;
                    for (let i = 0; i < $dom.find('.score').length; ++i) {
                        score1 += Number($dom.find('.score').eq(i).val());
                    }
                    $dom.find('.score1').val(score1);
                    $('#fullMark').val(getFullMark());
                });
                $dom.find('.smc').append($smcc);
                render($('#qtype').val(), $smcc.find('.card-body'), false, true);
                $smcc.find('.card-body .score').change(function () {
                    let score1 = 0;
                    for (let i = 0; i < $dom.find('.score').length; ++i) {
                        score1 += Number($dom.find('.score').eq(i).val());
                    }
                    $dom.find('.score1').val(score1);
                    $('#fullMark').val(getFullMark());
                });
            }
        });
    });

    $root.append($dom);
}

// 获取数据
function getData($dom, questionType, isQid) {
    let _isQid = isQid || false;

    if (_isQid) {
        return {
            qid: $dom.find('input[type="text"]').val(),
            type: questionType,
            content: '',
            answer: '',
            options: [],
            smallQuestions: [],
            score: Number($dom.find('.score').val())
        };
    }

    let data = {
        type: questionType,
        content: $dom.find('.content').val(),
        answer: $dom.find('.answer').val(),
        options: [],
        smallQuestions: [],
        qid: '',
        score: Number($dom.find('.score').val())
    };

    if (questionType == 0) {
        for (let i = 0; i < $dom.find('.op').length; ++i) {
            data.options.push($dom.find('.op').eq(i).val());
        }
    } else if (questionType == 1) {
        for (let i = 0; i < $dom.find('.op').length; ++i) {
            data.options.push($dom.find('.op').eq(i).val());
        }
        data.answer = '';
        for (let i = 0; i < $dom.find('[name="op"]:checked').length; ++i) {
            data.answer += $dom.find('[name="op"]:checked').eq(i).val();
        }
    } else if (questionType == 5) {
        for (let i = 0; i < $dom.find('.smcc').length; ++i) {
            data.smallQuestions.push(getData($dom.find('.smcc').eq(i), $dom.find('.smcc').eq(i).attr('data-type')));
        }
        data.answer = '';
        data.score = Number($dom.find('.score1').val());
    }

    return data;
}

// 获取满分
function getFullMark() {
    let score = 0;
    for (let i = 0; i < $('.score').length; ++i) {
        score += Number($('.score').eq(i).val());
    }
    return score;
}

// 提交
function submit() {
    let data = {
        name: $('#paperName').val(),
        pid: $('#pid').val(),
        course: $('#course').val(),
        cid: $('#cid').val(),
        fullMark: getFullMark(),
        questions: {}
    };
    let $c = $('.exam_page_h2').parent().find('.exam_page_block');
    let qesa = ['sin', 'mut', 'jug', 'bnk', 'sht', 'cmp'];

    for (let i = 0; i < qesa.length; ++i) {
        data.questions[qesa[i]] = [];
        for (let j = 0; j < $(`#${qesa[i]} .qc`).length; ++j) {
            let $dom = $(`#${qesa[i]} .qc`).eq(j);
            let da = {};
            if ($dom.hasClass('fromlib')) {
                da = getData($dom.find('.card-body'), i, true);
            } else {
                da = getData($dom.find('.card-body'), i, false);
            }
            data.questions[qesa[i]].push(da);
        }
    }

    console.log(data);
    data.questions = JSON.stringify(data.questions);

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: data,
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                window.location.pathname = '/paperManagement';
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