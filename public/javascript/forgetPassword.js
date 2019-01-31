$(function () {

    // 下拉框
    $('.dropdown-item').click(function () {
        $(this).parent().prev().find('span').html($(this).html());
    });

    // 验证码
    var $verifyCode = new GVerify({
        id: 'GVerify',
        height: '38'
    });

    $('#GVerify').append($('<small id="verificationCode-em" class="form-text text-danger"></small>'));

    // 验证码校验
    $('input#verificationCode').blur(function () {
        if ($(this).val() === '') {
            $(this).removeClass('is-valid').addClass('is-invalid');
            $('#verificationCode-em').html('验证码不能为空！');
        } else if (!$verifyCode.validate($(this).val())) {
            $(this).removeClass('is-valid').addClass('is-invalid');
            $('#verificationCode-em').html('验证码错误，请重新输入！');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
            $('#verificationCode-em').html('');
        }
    });

    // 登录按钮
    $('button#login').click(login);
});

/**
 * 登录
 */
function login() {

    // 校验
    if (validate()) {

        var data = {
            username: $('#username').val(),
            password: $('#password').val(),
            userType: getUserType($('.dropdown button span').html())
        }

        layui.use('layer', function () {
            layui.layer.msg('正在登录...', {
                icon: 16,
                shade: 0.01,
                time: 0
            });
        });

        console.log('登录成功');

        // $.ajax({
        //     type: "post",
        //     url: "url",
        //     data: data,
        //     dataType: "json",
        //     success: function (data) {

        //     },
        //     error: function (error) {

        //     }
        // });
    }
}

/**
 * 获取用户类型数值
 * @param { String } str 用户类型字符串
 */
function getUserType(str) {
    var userType = 0;
    switch (str) {
        case '考生':
            userType = 0;
            break;
        case '教师':
            userType = 1;
            break;
        case '管理员':
            userType = 2;
            break;
        default:
            break;
    }

    return userType;
}

/**
 * 表单校验
 * @return { Boolean } 是否通过验证
 */
function validate() {

    var isValid = true;

    // 用户名
    if ($('#username').val() === '') {
        $('#username').removeClass('is-valid').addClass('is-invalid');
        $('#username-em').html('用户名不能为空！');
        isValid = false;
    } else {
        $('#username').removeClass('is-invalid').addClass('is-valid');
        $('#username-em').html('');
    }

    // 密码
    if ($('#password').val() === '') {
        $('#password').removeClass('is-valid').addClass('is-invalid');
        $('#password-em').html('密码不能为空！');
        isValid = false;
    } else if ($('#password').val().length > 16) {
        $('#password').removeClass('is-valid').addClass('is-invalid');
        $('#password-em').html('密码长度不能超过16！');
        isValid = false;
    } else {
        $('#password').removeClass('is-invalid').addClass('is-valid');
        $('#password-em').html('');
    }

    // 验证码
    if ($('#verificationCode').val() === '') {
        $('#verificationCode').removeClass('is-valid').addClass('is-invalid');
        $('#verificationCode-em').html('验证码不能为空！');
        isValid = false;
    } else if ($('#verificationCode-em').html() !== '') {
        isValid = false;
    } else {
        $('#verificationCode').removeClass('is-invalid').addClass('is-valid');
        $('#verificationCode-em').html('');
    }

    console.log('isValid: ', isValid);

    return isValid;
}