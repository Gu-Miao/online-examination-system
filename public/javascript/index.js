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

    // 验证码提示信息
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

        var userType = getUserType($('.dropdown button span').html());
        var data = {
            id: 'login',
            username: $('#username').val(),
            password: $('#password').val(),
            userType: userType
        }

        layer.msg('正在登录...', {
            icon: 16,
            shade: 0.01,
            time: 0
        });

        $.ajax({
            type: "post",
            url: window.location.href,
            data: data,
            dataType: "json",
            success: function (data) {
                setTimeout(function () {
                    layer.closeAll();
                    console.log('data', data);
                    console.log(!Number(data));
                    if (data == 0) {
                        if (userType == 0) {
                            window.location.pathname = '/studentHome';
                        } else if (userType == 1) {
                            window.location.pathname = '/teacherHome';
                        } else {
                            window.location.pathname = '/managerHome';
                        }
                    } else if (data == 1) {
                        layer.msg('用户名不存在', { icon: 5, time: 2000 });
                    } else if (data == 2) {
                        layer.msg('密码错误', { icon: 5, time: 2000 });
                    } else {
                        layer.msg('登录失败，请重新登录', { icon: 5, time: 2000 });
                    }
                }, 1000);
            },
            error: function (err) {
                setTimeout(function () {
                    layer.closeAll();
                    throw err;
                }, 1000);
            }
        });
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

    var exp = /^[\w_.]{6,16}$/;

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
    } else if ($('#password').val().length < 6) {
        $('#password').removeClass('is-valid').addClass('is-invalid');
        $('#password-em').html('密码长度不能少于6！');
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