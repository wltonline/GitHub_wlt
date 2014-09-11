(function ($) {
    /**
     * 创建html代码
     */
    function createHtml($this) {

    }

    /**
     * 检测数据是否合法
     */
    function checkData(){

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
                options = $.extend({}, options, $.fn.xrFormControl.defaults, initOptions);
                createHtml($this);
            });
        },
        /**
         * 检测数据是否合法
         */
        checkData:function(type){
             switch(type){
                 case "phone": alert(1); break;
             }
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

    var methodName = "xrFormControl";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrFormControl = function () {
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
    $.fn.xrFormControl.defaults = {
        errorTip: 'hell'
    };
})(jQuery);

