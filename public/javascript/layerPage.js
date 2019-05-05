// 获取表单DOM结构
function getformDOM(data) {
    let $c = $('.form-row');
    let isPreview = window.location.pathname.split('Preview').length == 2;
    for (let i in data) {
        $c.append(inputDOM(i, data[i], isPreview));
    }

    if (!isPreview) {
        $c.append($(`
            <div class="form-group col-12 mt-5 text-center">
                <button class="btn btn-primary px-4">提交</button>
            </div>
        `));
        $c.find('button.px-4').click(data, submit);
    }
}

// 表单控件DOM
function inputDOM(field, data, isPreview) {
    $DOM = $(`<div class="form-group col-${data.col}"></div>`);
    if (data.menu) {
        $DOM.append($(`
            <label>${data.title}</label>
            <div class="dropdown w-100 float-right">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-toggle="dropdown">
                    <span id="${field}">请选择</span>
                </button>
                <div class="dropdown-menu w-100"></div>
            </div>
        `));
        if(isPreview) $DOM.find('button.dropdown-toggle').removeAttr('data-toggle');
        for (let i = 0; i < data.menu.length; ++i) {
            $DOM.find('.dropdown-menu').append($(`
                    <a class="dropdown-item" href="#">${data.menu[i]}</a>
                `));
        }
        $DOM.find('.dropdown-item').click(dropdownSelect);
    } else if (data.area) {
        $DOM.append($(`
            <label>${data.title}</label>
            <textarea id="${field}" class="form-control"></textarea>
        `));
        if (isPreview) $DOM.find('textarea').prop('readonly', true);
    } else {
        $DOM.append($(`
            <label>${data.title}</label>
            <input id="${field}" type="${(data.password) ? 'password' : 'text'}" class="form-control" placeholder="${data.title}">
        `));
        if (isPreview) $DOM.find('input').prop('readonly', true);
    }

    return $DOM;
}

/**
 * 获取控件数据
 */
function getInputData(data) {
    let inputData = {};
    for (let i in data) {
        inputData[i] = (data[i].menu) ? (($(`#${i}`).html() == '请选择') ? '' : $(`#${i}`).html()) : $(`#${i}`).val();
    }

    return inputData;
}