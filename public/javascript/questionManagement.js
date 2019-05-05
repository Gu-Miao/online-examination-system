$(function () {

    // 下拉框
    $('#search-item .dropdown-item').click(dropdownSelect);

    // 查询
    $('#search').click(search);

    // 重置
    $('#reset').click(function () {
        $('#search-input').val('');
        $('#question-type button span').html('题目类型');
        $('#search-content button span').html('查询内容');
    });

    // 初始化表格
    initTable();
});

var table = new Table();

// 初始化表格
function initTable() {

    loadingy();

    $.ajax({
        type: "post",
        url: window.location.href,
        data: {},
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                table.init('#body', {
                    "head": [
                        {
                            "field": "content",
                            "title": "题干"
                        },
                        {
                            "field": "qid",
                            "title": "ID号"
                        },
                        {
                            "field": "type",
                            "title": "题目类型"
                        }
                    ],
                    "body": data,
                    newClick: openNewLayer,
                    previewClick: openPreviewLayer,
                    changeClick: openChangeLayer,
                    deleteClick: openDeleteLayer
                });
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

// 查询
function search() {
    var type = $('#question-type button span').html();
    var content = $('#search-content button span').html();
    var input = $('#search-input').val();

    var data = {};
    if (input != '') {
        if (content == "查询内容") {
            data.$or = [{ content: input }, { qid: input }];
        } else if (content == "题干") {
            data.content = input;
        } else {
            data.qid = input;
        }
    }

    if (type != '题目类型') {
        if (type == '单选题') {
            data.type = 0;
        } else if (type == '多选题') {
            data.type = 1;
        } else if (type == '判断题') {
            data.type = 2;
        } else if (type == '填空题') {
            data.type = 3;
        } else if (type == '简答题') {
            data.type = 4;
        } else {
            data.type = 5;
        }
    }

    $.ajax({
        type: "post",
        url: window.location.href,
        data: { search: JSON.stringify(data) },
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                table.update(data);
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

// 打开新增用户信息确认对话框
function openNewLayer() {
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
                <option value="5">综合题</option>
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
            formy('新增', `/questionManagementNew?type=${$('#qtype').val()}`, ['700px', '510px']);
        },
        no: function (index) {
            layer.close(index);
        }
    });
}

// 打开预览对话框
function openPreviewLayer() {
    formy('预览', `/questionManagementPreview?qid=${$(this).parent().parent().children().eq(1).html()}`, ['700px', '420px']);
}

// 打开修改用户信息确认对话框
function openChangeLayer() {
    formy('修改', `/questionManagementChange?qid=${$(this).parent().parent().children().eq(1).html()}`, ['700px', '510px']);
}


// 打开删除用户确认对话框
function openDeleteLayer() {
    var $delBtn = $(this);
    cony('确定删除此用户吗？', deleteUser, $delBtn);
}

// 删除用户
function deleteUser($delBtn) {

    loadingy();

    var qid = $delBtn.parent().parent().find('td:eq(1)').html();
    $.ajax({
        type: "delete",
        url: window.location.href,
        data: { qid: qid },
        dataType: "json",
        success: function (data) {
            layer.closeAll();
            oky('删除成功', 2000);

            $.ajax({
                type: "post",
                url: window.location.href,
                data: {},
                dataType: "json",
                success: function (data) {
                    setTimeout(function () {
                        layer.closeAll();
                        table.update(data);
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
        },
        error: function (err) {
            layer.closeAll();
            erry('删除失败，请稍后再试', 2000);
            throw err;
        }
    });
}