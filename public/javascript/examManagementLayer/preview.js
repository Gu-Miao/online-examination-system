const eid = getRequest(window.location.search).eid;

$(function () {

    loadingy();
    // 初始化页面
    getformDOM(layerData.examManagement);

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: getRequest(window.location.search),
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                data = data[0];
                for (let i in data) {
                    if (!layerData.examManagement[i]) continue;
                    $(`#${i}`).val(data[i]);
                }
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('加载对话框失败', { icon: 5 });
                parent.layer.close(parent.layer.getFrameIndex(Window.name));
                throw err;
            }, 1000);
        }
    });
});