$(function () {

    // 下拉框
    $('#search-item .dropdown-item').click(dropdownSelect);

    // 查询
    $('#search').click(search);

    // 重置
    $('#reset').click(function () {
        $('#search-input').val('');
        $('#user-type button span').html('用户类型');
        $('#search-content button span').html('查询内容');
        $('#user-college button span').html('所属学院');
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
                            "field": "name",
                            "title": "试卷名"
                        },
                        {
                            "field": "pid",
                            "title": "ID号"
                        },
                        {
                            "field": "course",
                            "title": "课程名"
                        },
                        {
                            "field": "cid",
                            "title": "课程ID号"
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
    var content = $('#search-content button span').html();
    var input = $('#search-input').val();

    var data = {};
    if (input != '') {
        if (content == "查询内容") {
            data.$or = [{ name: input }, { pid: input }];
        } else if (content == "试卷名") {
            data.name = input;
        } else {
            data.pid = input;
        }
    }

    $.ajax({
        type: "post",
        url: window.location.pathname,
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
    window.location.href = window.location.origin + '/paperManagementNew';
}

// 打开预览对话框
function openPreviewLayer() {
    window.location.href = window.location.origin + `/paperManagementPreview?pid=${$(this).parent().parent().children().eq(1).html()}`;
}

// 打开修改用户信息确认对话框
function openChangeLayer() {
    window.location.href = `${window.location.origin}/paperManagementChange?pid=${$(this).parent().parent().children().eq(1).html()}`;
}


// 打开删除用户确认对话框
function openDeleteLayer() {
    var $delBtn = $(this);
    cony('确定删除此用户吗？', deleteUser, $delBtn);
}

// 删除用户
function deleteUser($delBtn) {
    loadingy();
    var pid = $delBtn.parent().parent().find('td:eq(1)').html();
    $.ajax({
        type: "delete",
        url: window.location.href,
        data: { pid: pid },
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