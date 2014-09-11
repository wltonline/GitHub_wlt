
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
            return this.each(function () {
                options = $.extend({}, options, $.fn.xrBgSwitch.defaults, initOptions);
                var bg=options.bgClass;
                var $this = $(this);
                var childs=null;
                if($this.children())
                {
                    childs=$this.children();
                }
                if($this.children().children())
                {
                    childs=$this.children().children();
                }
                for (var i = 0; i < childs.length; i++) {
                    childs[i].i = i;
                    $(childs[i]).mouseover(function () {
                        childs.removeClass(bg);
                        $(childs[this.i]).addClass(bg);
                    });
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

    var methodName = "xrBgSwitch";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrBgSwitch = function () {
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
    $.fn.xrBgSwitch.defaults = {          // wangyq : 5
        errorTip: 'hell'
    };
})(jQuery);

