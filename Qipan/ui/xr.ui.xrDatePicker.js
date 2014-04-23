(function ($) {
    function clearChoiceTimeCss(dp, that) {
        that.find("." + rangeCss.timechoice).removeClass(rangeCss.timechoice);
    }

    var rangeCss = {
        xrRangeDatePicker: "xrRangeDatePicker", //日期范围最高层css
        timediv: "TimeDiv",    //显示时间div布局css
        inputtime: "inputTime",    //包含input输入框的div的css
        choicetime: "xrRangeDate-choiceTime",   //包含日期选择范围按钮div的css
        timechoice: "xrRangeDate-timeChoice",  //按钮被选中的css
        setTimeBg: "setTimeBg"    //设置时间的按钮背景
    };

    /**
     * 创建日期范围选择的html源码
     * @param $this
     */
    function createHtml($this) {
        var xrRangeDatePicker = rangeCss.xrRangeDatePicker; //日期范围最高层css
        var timediv = rangeCss.timediv;    //显示时间div布局css
        var inputtime = rangeCss.inputtime;  //包含input输入框的div的css
        var choicetime = rangeCss.choicetime;  //包含日期选择范围按钮div的css
        var timechoice = rangeCss.timechoice;  //按钮被选中的css
        var setTimeBg = rangeCss.setTimeBg;//设置时间的按钮背景
        var inputDiv = $("<div><label></label><input/><span></span><span></span><input/><span></span></div>");
        inputDiv.addClass(timediv + " " + inputtime);
        inputDiv.find("label:eq(0)").html(options.title);
        inputDiv.find("input:eq(0)").attr({"id": options.beginTimeId, "type": "text",name:options.beginName,readonly:options.startReadonly});
        inputDiv.find("input:eq(1)").attr({"id": options.endTimeId, "type": "text",name:options.endName,readonly:options.endReadonly});

        inputDiv.find("span:eq(0)").addClass(setTimeBg).click(function () {
            WdatePicker({el: options.beginTimeId, onpicked: function () {
                return function (dp) {
                    clearChoiceTimeCss(dp, $this);
                };
            }()
            });
        });
        inputDiv.find("span:eq(1)").html("-");
        inputDiv.find("span:eq(2)").addClass(setTimeBg).click(function () {
            WdatePicker({el: options.endTimeId, onpicked: function () {
                return function (dp) {
                    clearChoiceTimeCss(dp, $this);
                };
            }()
            });
        });
        var rangeTimeDiv = $("<div></div>");
        rangeTimeDiv.addClass(timediv + " " + choicetime);
        try {
            if (options.rangeTimeOptions.length > 0) {
                var drto = options.rangeTimeOptions;
                for (var i = 0; i < drto.length; i++) {
                    rangeTimeDiv.append(
                        $("<a></a>").html(timeTitle(drto[i]))
                            .attr({"href": "javascript:void(0)", "xrRangeTime": drto[i]})
                            .click(function () {
                                rangeTimeDiv.find("a").removeClass(timechoice);
                                $(this).addClass(timechoice);
                                var showTime = xrb.rangeTime($(this).attr("xrRangeTime"));
                                var beginTime = showTime.beginTime;
                                var endTime = showTime.endTime;
                                $("#" + options.beginTimeId).val(beginTime);
                                $("#" + options.endTimeId).val(endTime);
                                xr.base.callBack(options.postLoad, beginTime, endTime)
                            }));
                }
            }
        } catch (e) {
            console.log("提示：" + e.message);
        }
        $this.append(inputDiv).append(rangeTimeDiv);
        $this.addClass(xrRangeDatePicker);
        try {
            if (options.beginTime) {
                $("#" + options.beginTimeId).val(options.beginTime);
                $("#" + options.endTimeId).val(options.endTime);
            } else if (options.selectedOptionIndex) {
                var thisIndex = options.selectedOptionIndex;
                $("#" + options.beginTimeId).val(setTime($this, thisIndex).beginTime);
                $("#" + options.endTimeId).val(setTime($this, thisIndex).endTime);
            } else {
                $("#" + options.beginTimeId).val("");
                $("#" + options.endTimeId).val("");
            }
        } catch (e) {
            console.log("提示：" + e.message + "数据不存在");
        }
    }

    /**
     * 按照selectedOptionIndex选项设置input输入框中初始化时间
     * @param index
     * @returns {*}
     */
    function setTime($this, index) {
        index = index - 1;
        var time;
        var ctime = $this.find($("." + rangeCss.choicetime)).find("a");
        ctime.each(function (i, val) {
            if (i == index) {
                ctime.removeClass(rangeCss.timechoice);
                $(val).addClass(rangeCss.timechoice);
                time = xrb.rangeTime($(val).attr("xrRangeTime"));
            }
        });
        return time;
    }

    /**
     * 根据传入的值，返回日期范围选择的显示内容
     * @param value
     * @returns {string}
     */
    function timeTitle(value) {

        var firstStr = value.charAt(0);
        switch (firstStr) {
            case "D":
                return  "最近" + value.substring(1, value.length) + "天";
                break;
            case "W":
                return  "最近" + value.substring(1, value.length) + "周";
                break;
            case "M":
                return  "最近" + value.substring(1, value.length) + "个月";
                break;
            case "Q":
                return  "最近" + value.substring(1, value.length) + "季度";
                break;
            case "Y":
                return  "最近" + value.substring(1, value.length) + "年";
                break;
            default :
                break;
        }
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
                options = $.extend({}, options, $.fn.xrRangeDatePicker.defaults, initOptions);
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

    var methodName = "xrRangeDatePicker";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrRangeDatePicker = function () {
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
     * @type {{options: Array, className: string, postLoad: null}}
     */
    $.fn.xrRangeDatePicker.defaults = {
    };
})
    (jQuery);
