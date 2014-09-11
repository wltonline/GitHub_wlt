
(function ($) {
    /**
     * 公共方法体
     * @type {{init: Function, destroy: Function, option: Function}}
     */
    var methods = {
        /**
         * 初始化函数
         * @param initOptions
         * @returns {*}
         */
        init: function (initOptions) {
            var tabs = $(this);
            return this.each(function () {
                options = $.extend({}, options, $.fn.xrTab.defaults, initOptions);
                var isClick = false;
                var padSelector = options.padSelector;
                var currClass = options.currClass;
                var otherClass = options.otherClass;
                isClick = options.isClick;
                tabs.css({cursor: 'pointer'})
                var pads = $(padSelector);
                pads.not(':eq(0)').hide();
                function over() {
                    var currTab = $(this);
                    var at = tabs.index(currTab);
                    var curPad = pads.eq(at);
                    currTab.removeClass(otherClass).addClass(currClass);
                    tabs.not(currTab).removeClass(currClass).addClass(otherClass);
                    curPad.show();
                    pads.not(curPad).hide();
                }
                if (tabs.size() == pads.size()) {
                    if (isClick) {
                        tabs.click(over);
                    } else {
                        tabs.hover(over, function () {
                        });
                    }
                }
            });
        },
        /**
         *预留函数
         * @returns {*}
         */
        destroy: function () {
            return this.each(function () {
            });
        },
        /**
         *
         * @param key
         * @param value
         * @returns {*}
         */
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
    }

    var methodName = "xrTab";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrTab = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === "object" || !method) {
            method = methods.init;
        } else {
            $.error("Method(" + method + ") does not exist on " + methodName);
            return this;
        }
        return method.apply(this, arguments);
    }

    /**
     * 插件使用的数据
     * @type {{data: Array, className: string, postLoad: null}}
     */
    $.fn.xrTab.defaults = {
    };
})
    (jQuery);
