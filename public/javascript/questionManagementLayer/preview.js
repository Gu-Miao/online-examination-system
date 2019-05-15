// 全局变量
const qid = getRequest(window.location.search).qid;
let $root = $('#root');

$(function () {

    loadingy();

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: getRequest(window.location.search),
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();

                data = data[0];
                console.log(data);
                render(data.type, $root, data);
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('加载对话框失败', { icon: 5 });
                parent.layer.close(parent.layer.getFrameIndex(Window.name));
                throw err;
            }, 1000);
        }
    });
});

// 渲染页面
function render(type, $dom, data) {

    if (type == 0) {
        newSin($dom, data);
    } else if (type == 1) {
        newMult($dom, data);
    } else if (type == 2) {
        newJug($dom, data);
    } else if (type == 3) {
        newBlank($dom, data);
    } else if (type == 4) {
        newShort($dom, data);
    } else if (type == 5) {
        newCom($dom, data);
    } else {
        erry('题目类型错误', 2000);
    }
}

// 单选题
function newSin($root, data) {

    let $dom = $(`
        <div class=" col-12">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control" readonly>${data.content}</textarea>
            </div>
            <div class="form-group col-6">
                <label>正确答案</label>
                <input type="number" class="answer form-control" value="${data.answer}" readonly>
            </div>
        </div>
    `);

    for (let i = 0; i < data.options.length; ++i) {
        $dom.find('.answer').parent().before($(`
            <div class="form-group col-12">
                <label>选项${i + 1}</label>
                <input type="text" class="form-control" value="${data.options[i]}" readonly>
            </div>
        `));
    }

    $root.append($dom);
}

// 多选题
function newMult($root, data) {

    let $dom = $(`
        <div class="col-12">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control" readonly>${data.content}</textarea>
            </div>
            <div class="form-group col-6">
                <label>正确答案</label>
                <input type="text" class="answer form-control" value="${data.answer.split('').join(', ')}" readonly>
            </div>
        </div>
    `);
    for (let i in data.options) {
        $dom.find('.answer').parent().before($(`
            <div class="form-group col-12">
                <label>选项${Number(i) + 1}</label>
                <input type="text" class="form-control" value="${data.options[i]}" readonly>
            </div>
        `));
    }

    $root.append($dom);
}

// 判断题
function newJug($root, data) {

    let $dom = $(`
        <div class="form-group col-12">
            <label>题干</label>
            <textarea class="content form-control" readonly>${data.content}</textarea>
        </div>
        <div class="form-group col-6">
            <label>正确答案</label>
            <input type="text" class="answer form-control" value="${data.answer ? '正确' : '错误'}" readonly>
        </div>
    `);

    $root.append($dom);
}

// 填空题
function newBlank($root, data) {
    $root.append(`
        <div class="form-group col-12">
            <label>题干</label>
            <textarea class="content form-control" readonly>${data.content}</textarea>
        </div>
    `);

    let answer = data.answer.split('$$$');
    for (let i = 0; i < answer.length; ++i) {
        $root.append($(`
            <div class="form-group col-4">
                <label>正确答案</label>
                <input type="text" class="answer form-control" value="${answer[i]}" readonly>
            </div>
        `));
    }

}

// 简答题
function newShort($root, data) {
    $root.append(`
        <div class="form-group col-12">
            <label>题干</label>
            <textarea class="content form-control" readonly>${data.content}</textarea>
        </div>
        <div class="form-group col-12">
            <label>正确答案</label>
            <textarea class="content form-control" readonly>${data.answer}</textarea>
        </div>
    `);
}

// 综合题
function newCom($root, data) {

    let $dom = $(`
        <div class="col-12">
            <div class="form-group col-12">
                <label>题干</label>
                <textarea class="content form-control" readonly>${data.content}</textarea>
            </div>
            <div id="smc" class="form-group col-12"></div>
        </div>
    `);

    for (let i = 0; i < data.smallQuestions.length; ++i) {
        let $c = $(`
            <div id="a${i}" class="smcc m-3 rounded">
                <div class="card">
                    <div class="card-header">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#b${i}">
                            小问${i + 1}
                        </button>
                    </div>
                    <div id="b${i}" class="collapse" data-parent="#a${i}">
                        <div class="card-body">
                        </div>
                    </div>
                </div>
            </div>
        `);
        render(data.smallQuestions[i].type, $c.find('.card-body'), data.smallQuestions[i]);
        $dom.find('#smc').append($c);
    }

    $root.append($dom);
}