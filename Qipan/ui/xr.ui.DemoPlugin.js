
(function ($) {
    // 私有方法
    var privateFunction = function () {
    };

    // 公有方法
    var methods = {
        init: function (initOptions) {
            return this.each(function () {
                var $this = $(this);

                options = $.extend({}, $.fn.xrDemoPlugin.defaults, initOptions);

                // code here
                privateFunction();
            });
        },
        destroy: function () {
            return this.each(function () {
            });
        },
        getFormatString: function (txt) {
            return ('<strong>' + txt + '</strong>');
        },
        format: function (txt) {
            return this.each(function () {
                alert('<strong>' + txt + '</strong>');
            });
        },
        option: function (key, value) {
            if (arguments.length == 2)
                return this.each(function () {
                    if (options[key]) {
                        options[key] = value;
                    }
                });
            else
                return options[key];
        }
    };

    var pluginName = 'xrDemoPlugin';

    var options = {};

    $.fn.xrDemoPlugin = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === "object" || !method) {
            method = methods.init;
        } else {
            $.error("Method(" + method + ") does not exist on " + pluginName);
            return this;
        }
        return method.apply(this, arguments);
    };

    // 插件的defaults
    $.fn.xrDemoPlugin.defaults = {
        foreground: 'red',
        background: 'yellow'
    };
})(jQuery);

