// 全局变量
const questionType = getRequest(window.location.search).type;
let $root = $('#root');

$(function () {
    // 渲染页面
    render(questionType, $root);

    $('#sub').click(submit);
});

// 渲染页面
function render(type, $dom) {
    switch (type) {
        case '0':
            newSin($dom);
            break;
        case '1':
            newMult($dom);
            break;
        case '2':
            newJug($dom);
            break;
        case '3':
            newBlank($dom);
            break;
        case '4':
            newShort($dom);
            break;
        case '5':
            newCom($dom);
            break;
        default:
            break;
    }
}

// 单选题
function newSin($root) {

    let $dom = $(`
        <div class=" col-12">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control"></textarea>
            </div>
            <div class="form-group col-6">
                <label>正确答案</label>
                <input type="number" class="answer form-control" min="1" step="1">
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
        console.log(op_count)
        if ($(this).val() > op_count) $(this).val('');
        $(this).prop('max', op_count);
    });

    $root.append($dom);
}

// 多选题
function newMult($root) {

    let $dom = $(`
        <div class="col-12">
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

    $root.append($dom);
}

// 判断题
function newJug($root) {
    
    let $dom = $(`
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
    `);

    $root.append($dom);
}

// 填空题
function newBlank($root) {
    $root.append(`
        <div class="form-group col-12">
            <label>题干</label>
            <textarea class="content form-control"></textarea>
        </div>
        <div class="form-group col-12">
            <label>正确答案</label>
            <input type="text" class="answer form-control">
        </div>
    `);
    infoy('如果有多个空，填写答案时用三个美元号将答案隔开，如：“$$$”', 3000);
}

// 简答题
function newShort($root) {
    $root.append(`
        <div class="form-group col-12">
            <label>题干</label>
            <textarea class="content form-control"></textarea>
        </div>
        <div class="form-group col-12">
            <label>正确答案</label>
            <input type="text" class="answer form-control">
        </div>
    `);
}

// 综合题
function newCom($root) {
    
    let $dom = $(`
        <div class="form-group col-12">
            <label>主题干</label>
            <textarea class="content form-control"></textarea>
        </div>
        <div id="smc" class="form-group col-12"></div>
        <div class="form-group col-12">
            <button id="addsm" class="btn btn-primary form-control w-100">添加小问</button>
        </div>
    `);
    $dom.find('#addsm').click(function () {
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
                const sml = $('.card').length + 1;
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
                    const sml = $('.card').length;
                    for (let i = 1; i <= sml; ++i) {
                        let $dom1 = $('.smcc').eq(i - 1);
                        $dom1.attr('id', `sm${i}`);
                        $dom1.find('button.c').html(`小问${i}`).attr('data-target', `#cl${i}`);
                        $dom1.find('.card-body').parent().attr('id', `cl${i}`).attr('data-parent', `#sm${i}`);
                    }
                });
                $('#smc').append($smcc);
                render($('#qtype').val(), $smcc.find('.card-body'));
            },
            no: function (index) {
                layer.close(index);
            }
        });
    });

    $root.append($dom);
}

// 获取数据
function getData($dom, questionType) {
    let data = {
        type: questionType,
        content: $dom.find('.content').val(),
        answer: $dom.find('.answer').val(),
        options: [],
        smallQuestions: []
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
    }

    return data;
}

// 提交
function submit(event) {

    let data = getData($root, questionType);
    data.options = JSON.stringify(data.options);
    data.smallQuestions = JSON.stringify(data.smallQuestions)

    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: data,
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                console.log(data);
                parent.table.update(data);
                parent.layer.close(parent.layer.getFrameIndex(Window.name));
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('新增失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
}