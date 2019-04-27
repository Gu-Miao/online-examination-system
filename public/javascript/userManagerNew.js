// 获取表单DOM结构
function getformDOM(data) {
    let $c = $('.form-row');
    for (let i = 0; i < data.form.length; ++i) {
        $c.append(inputDOM(data.form[i]));
    }
    $c.append($(`
        <div class="form-group col-12 mt-5 text-center">
            <button class="btn btn-primary px-4">提交</button>
        </div>
    `));
    $c.find('button.px-4').click(submit);
}

// 表单控件DOM
function inputDOM(data) {
    $DOM = $('<div class="form-group col-6"></div>');
    if (data.menu) {
        $DOM.append($(`
            <label>${data.title}</label>
            <div class="dropdown w-100 float-right">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-toggle="dropdown">
                    <span>请选择</span>
                </button>
                <div class="dropdown-menu w-100"></div>
            </div>
        `));
        for (let i = 0; i < data.menu.length; ++i) {
            $DOM.find('.dropdown-menu').append($(`
                <a class="dropdown-item" href="#">${data.menu[i]}</a>
            `));
        }
        $DOM.find('.dropdown-item').click(dropdownSelect);
    } else {
        $DOM.append($(`
            <label>${data.title}</label>
            <input type="text" class="form-control" placeholder="${data.title}">
        `));
    }

    return $DOM;
}

// 提交
function submit() {
    console.log(window.location.href);
}

/**
 * 使用 dropdown 实现 select 的效果
 * 给每个需要使用的 deropdown 组件绑定 click 事件
 */
function dropdownSelect() {
    $(this).parent().prev().find('span').html($(this).html());
}

var data = {
    title: '新增',
    form: [
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
            "title": "所属学院",
            "menu": [
                '文学院',
                '历史学院',
                '音乐学院',
                '美术学院',
                '数信学院',
                '软件学院',
                '体育学院',
                '物理学院',
                '化学学院',
                '生物学院',
                '旅游学院',
                '经济学院',
                '法学院'
            ]
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
    ]
}

getformDOM(data);