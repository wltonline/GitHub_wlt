
(function ($) {
    /**
     * 创建html源码
     * @param {object} $this -   操作当前dom的对象
     **/
    function createHtml($this) {

    }

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
            var $this = $(this);
            return this.each(function () {
                options = $.extend({}, options, $.fn.xrTopMenu.defaults, initOptions);
                alert(1)
                createHtml($this);
            });
        },
        select: function (code) {

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

    var methodName = "xrTopMenu";

    var options = {
        data: [],
        "pw": 100,
        "cw": 100,
        "h": 32
    };

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrTopMenu = function () {
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
    $.fn.xrTopMenu.defaults = {          // wangyq : 5
        errorTip: 'hell'
    };
})
    (jQuery);

