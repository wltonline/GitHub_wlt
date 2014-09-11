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

            rangeTime.endTime = moment().day(0).format('YYYY-MM-DD');
            if (days > 0) {
                rangeTime.beginTime = moment().day(0 - days).format('YYYY-MM-DD');

            }
            if (months > 0) {
                rangeTime.beginTime = moment().month(0 - months).format('YYYY-MM-DD');
            }
            return rangeTime;
        }
    };
}).apply(this);
