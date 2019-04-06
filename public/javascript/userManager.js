$(function () {

    // 下拉框
    $('#search-item .dropdown-item').click(dropdownSelect);

    $('#user-type .dropdown-item').click(function () {
        if ($('#user-type button span').html() != '管理员') {
            $('#user-college').show();
        } else {
            $('#user-college').hide();
        }
    });

    // 查询
    $('#search').click(function () {

    });

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

function initTable() {

    layer.msg('正在加载...', {
        icon: 16,
        shade: 0.01,
        time: 0
    });

    let data = {};
    let table = new Table();

    $.ajax({
        type: "post",
        url: window.location.href,
        data: data,
        dataType: "json",
        success: function (data) {
            setTimeout(function() {
                layer.closeAll();
                console.log(data);
                table.init('#body', {
                    "head": [
                        {
                            "field": "name",
                            "title": "姓名"
                        },
                        {
                            "field": "id",
                            "title": "ID号"
                        },
                        {
                            "field": "college",
                            "title": "所属学院"
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
                    "body": data
                });

                console.log(table);
            }, 1000);
        },
        error: function (err) {
            setTimeout(function() {
                layer.closeAll();
                throw err;
            }, 1000);
        }
    });
}