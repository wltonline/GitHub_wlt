
$(function () {
    $.fn.xrPluginInit();
});

(function ($) {
    $.fn.xrPluginInit = function () {
        var xrPlugin = $("[xrpn]");

        $.each(xrPlugin, function (i, p) {
            var pluginName = $(p).attr("xrpn");
            var pluginData = $(p).attr("xrpd");
            var initPluginStatement = '$(p).' + pluginName + '(' + pluginData + ')';
            try {
                eval(initPluginStatement);
            } catch (e) {
                console.log('错误' + e.name + ':' + e.message+"pluginName不存在，或者pluginData数据解析有误！");
            }
        });
    }
})(jQuery);

