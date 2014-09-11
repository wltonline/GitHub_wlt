(function ($) {
    /**
     * 创建html代码
     */
    function createHtml($this) {
        var thisStr = options;
        var price = thisStr.price;
        var normal = thisStr.normal;
        var bigf = thisStr.bigf;
        var smallf = thisStr.smallf;
        var color = thisStr.color;
        var priceIcon;
        var bigPrice;
        var smallPrice;
        var priceName;
        price = price + "";
        var priceArray = [];
        if (price.indexOf(".") > -1) {
            priceArray.push(price.split(".")[0]);
            priceArray.push(price.split(".")[1]);
        }
        if (priceArray[0].length > 8) {
            price = price / 100000000;
            price = price.toFixed(2);
            price = price + "";
            priceArray = price.split(".");
            priceIcon = $("<b></b>").html("￥").addClass(normal).css("margin-right", "2px");
            bigPrice = $("<b></b>").html(priceArray[0]).addClass(bigf + " " + color);
            smallPrice = $("<b></b>").html("." + priceArray[1]).addClass(smallf + " " + color);
            priceName = $("<b></b>").html("亿元").addClass(normal).css("margin-left", "2px");

        } else if (priceArray[0].length > 4) {
            price = price / 10000;
            price = price.toFixed(2);
            price = price + "";
            priceArray = price.split(".");
            priceIcon = $("<b></b>").html("￥").addClass(normal).css("margin-right", "2px");
            bigPrice = $("<b></b>").html(priceArray[0]).addClass(bigf + " " + color);
            smallPrice = $("<b></b>").html("." + priceArray[1]).addClass(smallf + " " + color);
            priceName = $("<b></b>").html("万元").addClass(normal).css("margin-left", "2px");

        } else {
            priceIcon = $("<b></b>").html("￥").addClass(normal).css("margin-right", "2px");
            bigPrice = $("<b></b>").html(priceArray[0]).addClass(bigf + " " + color);
            smallPrice = $("<b></b>").html("." + priceArray[1]).addClass(smallf + " " + color);
            priceName = $("<b></b>").html("元").addClass(normal).css("margin-left", "2px");
        }
        $this.html("");
        $this.append(priceIcon);
        $this.append(bigPrice);
        $this.append(smallPrice);
        $this.append(priceName);
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
                options = $.extend({}, options, $.fn.xrPriceShow.defaults, initOptions);
                createHtml($this);
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

    var methodName = "xrPriceShow";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrPriceShow = function () {
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
    $.fn.xrPriceShow.defaults = {
        errorTip: 'hell'
    };
})(jQuery);

