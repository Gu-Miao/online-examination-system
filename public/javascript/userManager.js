$(function () {

    // 下拉框
    $('#search-item .dropdown-item').click(dropdownSelect);

    $('#user-type .dropdown-item').click(function() {
        if($('#user-type button span').html() != '管理员') {
            $('#user-college').show();
        } else {
            $('#user-college').hide();
        }
    });

    // 查询
    $('#search').click(function() {

    });

    // 重置
    $('#reset').click(function() {
        $('#search-input').val('');
        $('#user-type button span').html('用户类型');
        $('#search-content button span').html('查询内容');
        $('#user-college button span').html('所属学院');
    });

});