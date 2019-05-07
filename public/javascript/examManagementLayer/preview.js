$(function () {

    loadingy();

    // 初始化页面
    getformDOM(layerData.userManagement);

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: getRequest(window.location.search),
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                console.log(data);
                data = data[0];
                data.type ? data.type = "教师" : data.type = "考生";
                uid = data.uid;
                for (let i in data) {
                    if (!layerData.userManagement[i]) continue;
                    (layerData.userManagement[i].menu) ? $(`#${i}`).html(data[i]) : $(`#${i}`).val(data[i]);
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