import $ from 'jquery'
$.each($("textarea[data-autoresize]"), function () {
    let offset = this.offsetHeight - this.clientHeight;
    let resizeTextarea = function (el) {
        $(el)
            .css("height", "auto")
            .css("height", el.scrollHeight + offset);
    };
    $(this)
        .on("keyup input", function () {
            resizeTextarea(this);
        })
        .removeAttr("data-autoresize");
});
$(document).ready(function () {
    $("input[type=number]").keypress(function (e) {
        let key = e.keyCode;
        if (key !== 8 && key !== 0 && (key < 48 || key > 57)) {
            e.preventDefault();
        }
    });
});
