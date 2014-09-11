
(function () {
    $.namespace('xrb');

    xrb.buildTime = function () {
        return "$WCNOW$";
    };
    xrb.codeTime = function () {
        return "$WCDATE$";
    };
    xrb.version = function () {
        return "1.0.0.$WCREV$";
    };
    xrb.copyRight = function () {
        return "http://www.xrpension.com";
    };
}).apply(this);
