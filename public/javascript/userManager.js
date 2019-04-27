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
                            "title": "姓名"
                        },
                        {
                            "field": "uid",
                            "title": "ID号"
                        },
                        {
                            "field": "college",
                            "title": "所属学院"
                        },
                        {
                            "field": "major",
                            "title": "所属专业"
                        },
                        {
                            "field": "grade",
                            "title": "年级"
                        },
                        {
                            "field": "username",
                            "title": "登录账号"
                        },
                        {
                            "field": "password",
                            "title": "账号密码"
                        }
                    ],
                    "body": data,
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
    var type = $('#user-type button span').html();
    var content = $('#search-content button span').html();
    var college = $('#user-college button span').html();
    var input = $('#search-input').val();

    var data = {};
    if (input != '') {
        if (content == "查询内容") {
            data.$or = [{ name: input }, { uid: input }];
        } else if (content == "姓名") {
            data.name = input;
        } else {
            data.uid = input;
        }
    }
    if (college != '所属学院') {
        data.college = college
    }

    if (type != '用户类型') {
        if (type == '考生') {
            data.type = 0;
        } else {
            data.type = 1;
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

// 打开修改用户信息确认对话框
function openChangeLayer() {
    fromy('新增', '/userManagerNew', ['700px', '510px']);
}

// 修改用户信息
function changeUserInfo() {

}

// 打开删除用户确认对话框
function openDeleteLayer() {
    var $delBtn = $(this);
    cony('确定删除此用户吗？', deleteUser, $delBtn);
}

// 删除用户
function deleteUser($delBtn) {

    loadingy();

    var uid = $delBtn.parent().parent().find('td:eq(1)').html();
    $.ajax({
        type: "delete",
        url: window.location.href,
        data: { uid: uid },
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