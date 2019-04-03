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