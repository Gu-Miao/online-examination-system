$(function () {

    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: {},
        dataType: "json",
        success: function (data) {
            console.log(data);
            setTimeout(function () {
                layer.closeAll();
                renderExamList(data);
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


function renderExamList(data) {
    var $ul = $('.container ul');
    for (let i = 0; i < data.length; ++i) {
        $ul.append($(`<li><a href="/exam?eid=${data[i].eid}" target="_self">${data[i].cname}考试</a></li>`))
    }
}