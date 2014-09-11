
(function () {
    /*
     @sample : xrb.cssName.itemEvent(), xr.base.cssName.itemEvent()
     */
    xr.base.cssName = {
        /**
         * 获取指定名称，返回各种事件的css样式
         * @param itemName
         * @param eventName
         * @returns {string}
         */
        itemEvent: function (itemName, eventName) {
            return "xr_" + itemName + "_" + eventName;
        }
    };
}).apply(this);
