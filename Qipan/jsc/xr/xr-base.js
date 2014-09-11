jQuery.namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

(function () {
    $.namespace('xrb');

    xrb.buildTime = function () {
        return "2014/01/18 13:11:59";
    };
    xrb.codeTime = function () {
        return "2014/01/08 10:18:10";
    };
    xrb.version = function () {
        return "1.0.0.1847";
    };
    xrb.copyRight = function () {
        return "http://www.xrpension.com";
    };
}).apply(this);

(function () {
    var root = this;
    $.namespace('xr');

    /*
     @sample : xrb.setChildClass(), xr.base.setChildClass()
     */
    root.xrb = xr.base = {
        /**
         * 父级中除指定子级以外，全部取消css class
         * @param parent
         * @param child
         * @param cc
         */
        setChildClass: function (parent, child, cc) {
            parent.children().removeClass(cc);
            child.addClass(cc);
        },
        /**
         * 回调函数  执行插件外部传入的方法，并执行
         * @param fn  -回调函数方法
         */
        callBack: function (fn) {
            if (fn != null && typeof  fn == "function") {
                try {
                    arguments = Array.prototype.slice.call(arguments, 1);
                    fn.apply(this, arguments);
                } catch (e) {
                    console.log("错误：" + e.message);
                }
            }
        },
        /**
         * 根据传入的值，返回一个日期范围。
         * @param value
         * @returns {{beginTime: string, endTime: string}}
         */
        rangeTime: function (value) {

            var fStr = value.charAt(0);
            var sStr = value.substring(1, value.length);

            var days = 0;
            var months = 0;

            var rangeTime = {"beginTime": "", "endTime": ""};
            switch (fStr) {
                case "D":   //天
                    days = parseInt(sStr);
                    break;
                case "W":   //周
                    days = parseInt(sStr) * 7;
                    break;
                case "M":    //月
                    months = parseInt(sStr);
                    break;
                case "Q":   //季度
                    months = parseInt(sStr) * 3;
                    break;
                case "Y":    //年
                    months = parseInt(sStr) * 12;
                    break;
            }

            rangeTime.endTime = moment().format('YYYY-MM-DD');
            if (days > 0) {
                rangeTime.beginTime = moment().add('days', -days).format('YYYY-MM-DD');
            }
            if (months > 0) {
                rangeTime.beginTime = moment().add('months', -months).format('YYYY-MM-DD');
            }
            return rangeTime;

        }
    };
}).apply(this);

(function () {
    $.namespace('xr.base');

    /*
     @sample : xrb.cssName.itemEvent(), xr.base.cssName.itemEvent()
     */
    xr.base.css = {
        /**
         * 获取指定名称，返回各种事件的css样式
         * @param itemName
         * @param eventName
         * @returns {string}
         */
        itemEventName: function (itemName, eventName) {
            return "xr_" + itemName + "_" + eventName;
        },
        parseItemEvent: function (cssClass) {
            var cssNames;
            if (!$.isEmptyObject(cssClass)) {
                if (cssClass.indexOf("_") > -1) {
                    cssNames = cssClass.split("_");
                }
                if (cssClass.indexOf(" ") > -1) {
                    cssNames = cssClass.split(" ");
                }
            }
            return cssNames;
        }
    };
}).
    apply(this);
