uid = window.sessionStorage.eaxm_username;

$(function () {
    loadingy();
    $.ajax({
        type: "post",
        url: window.location.pathname,
        data: { uid: uid },
        dataType: "json",
        success: function (data) {
            setTimeout(function () {
                for (let i = 0; i < data.length; ++i) {
                    let $a = $(`<li><span>${data[i].name}成绩</span></li>`);
                    $a.find('span').click(function() {
                        infoy(`${data[i].name}成绩为：${data[i].score}`);
                    })
                    $('.container ul').append($a);
                }
                layer.closeAll();
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
})