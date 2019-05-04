/**
 * 判断一个字符串是否为数值型
 * @param   {String}    str 
 * @return  {Boolean}   是否为数值型
 */
function isNumber(str) {
    var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
    if (regPos.test(str) || regNeg.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 使用 dropdown 实现 select 的效果
 * 给每个需要使用的 deropdown 组件绑定 click 事件
 */
function dropdownSelect() {
    $(this).parent().prev().find('span').html($(this).html());
}

/**
 * 加载框
 */
function loadingy() {
    layer.msg('正在加载...', {
        icon: 16,
        shade: 0.01,
        time: 0
    });
}

/**
 * 信息框
 */
function infoy(info, time) {
    layer.msg(info, { time: time });
}

/**
 * ok信息框
 */
function oky(ok, time) {
    layer.msg(ok, { icon: 6, time: time });
}

/**
 * 错误信息框
 */
function erry(err, time) {
    layer.msg(err, { icon: 5, time: time });
}

/**
 * 确认框
 */
function cony(text, ycb, arg) {
    layer.open({
        type: 0,
        title: false,
        content: text,
        btnAlign: 'c',
        btn: ["确定", "取消"],
        closeBtn: 0,
        yes: function (index) {
            layer.close(index);
            ycb(arg);
        },
        no: function (index) {
            layer.close(index);
        }
    });
}

// 表单框
function formy(title, src, area) {
    layer.open({
        type: 2,
        title: [title, "font-size: 16px;"],
        content: src,
        area: area,
    });
}

// 获取 url 上的参数，只用于获取 ID
function getRequest(search) {
    search = search.substr(1);
    search = search.split('&');
    let data = {};
    for (let i = 0; i < search.length; ++i) {
        search[i] = search[i].split('=');
        data[search[i][0]] = search[i][1];
    }

    return data;
}