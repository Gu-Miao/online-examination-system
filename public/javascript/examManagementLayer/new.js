$(function () {

    // 初始化页面
    getformDOM(layerData.examManagement);
    laydate.render({
        elem: '#date',
        trigger: 'click'
    });

    laydate.render({
        elem: '#time',
        type: 'time',
        range: true,
        format: 'HH:MM',
        trigger: 'click'
    });

});

// 提交
function submit(event) {

    let data = getInputData(event.data);
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.href,
        data: data,
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                console.log(data);
                parent.table.update(data);
                parent.layer.close(parent.layer.getFrameIndex(Window.name));
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('新增失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
}