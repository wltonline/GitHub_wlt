
(function () {
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
}).apply(this);
