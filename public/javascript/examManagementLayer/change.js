const eid = getRequest(window.location.search).eid;

$(function () {

    loadingy();
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

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: { eid: eid },
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                data = data[0];
                console.log(data);
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

// 提交
function submit(event) {

    let data = getInputData(event.data);
    data.preid = eid;
    loadingy();

    $.ajax({
        type: "put",
        url: window.location.pathname,
        data: data,
        dataType: "json",
        timeout: 10 * 1000,
        success: function (data) {
            setTimeout(function () {
                layer.closeAll();
                parent.table.update(data);
                parent.layer.close(parent.layer.getFrameIndex(Window.name));
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('修改失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
}