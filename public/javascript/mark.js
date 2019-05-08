$(function () {
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: {},
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                if (!data.length) erry('暂无可阅试卷！', 3 * 1000);
                for (let i = 0; i < data.length; ++i) {
                    $('.container ul').append(`<li><a href="/markPaper?eid=${data[0].eid}&uid=${data[0].uid}" target="_self">${data[i].name}/${data[i].uid}</a></li>`);
                }
                layer.closeAll(layer.index - 1);
            }, 1000);
        },
        error: function (err) {
            setTimeout(function () {
                layer.closeAll();
                layer.msg('加载失败', { icon: 5 });
                throw err;
            }, 1000);
        }
    });
});