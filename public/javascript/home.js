console.log(window.sessionStorage.eaxm_name);
var name = window.sessionStorage.eaxm_name;
if (window.sessionStorage.eaxm_user_type == 0) {
    name += "同学";
} else if (window.sessionStorage.eaxm_user_type == 1) {
    name += "老师";
} else {
    name += "管理员";
}
$('span.user a.dropdown-toggle').html(name);