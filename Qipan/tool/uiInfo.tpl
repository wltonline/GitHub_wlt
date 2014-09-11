
(function () {
    $.namespace('xrui');

    xrui.buildTime = function () {
        return "$WCNOW$";
    };
    xrui.codeTime = function () {
        return "$WCDATE$";
    };
    xrui.version = function () {
        return "1.0.0.$WCREV$";
    };
    xrui.copyRight = function () {
        return "http://www.xrpension.com";
    };
}).apply(this);
