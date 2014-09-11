var lastsel3;
(function ($) {
    /**
     * 删除单元格右侧竖线
     * @param $this
     */
    function delRightBar() {
        var len = options.colModel.length;
        var thisAria = "gridTable_" + options.colModel[len - 1].name;
        $("[aria-describedby=" + thisAria + "]").css({"background-image": "none"});
    }

    function removeLastHeaderBar() {
        var len = options.colModel.length;
        var thisId = "#gridTable_" + options.colModel[len - 1].name;
        $(thisId).css({"background-image": "none", "border-right": "none"});
    }

    function amendPager() {
        $("#first_gridPager").find("span").html("首页").removeClass("ui-icon ui-icon-seek-first").addClass("pagerCss");
        $("#prev_gridPager").find("span").html("上一页").removeClass("ui-icon ui-icon-seek-prev").addClass("pagerCss");
        $("#next_gridPager").find("span").html("下一页").removeClass("ui-icon ui-icon-seek-next").addClass("pagerCss");
        $("#last_gridPager").find("span").html("尾页").removeClass("ui-icon ui-icon-seek-end").addClass("pagerCss");
        $(".ui-separator").css({"display": "none"});
        $("#sp_1_gridPager").css({"display": "none"});

//        alert($("#sp_1_gridPager").parent().html())

        $(".ui-pg-input").css({"display": "none"});

        var morePager = $("<a>1</a><a>2</a><a>3</a>")
        morePager.addClass("pagerCss");
//        alert(morePager.find("a").length);
        $(".ui-pg-input").parent().append(morePager);



        $(".ui-pg-input").parent().find("a:eq(0)").click(function(){
            $(".ui-pg-input").val(2);
            $(".ui-pg-input").submit();
        });

//        alert($(".ui-pg-input").val());

    }

    /**
     * 加载表格分页 ，点击分页时触发的事件
     * @param pgButton
     */
    function uppage(pgButton) {
        var page = options.$this.jqGrid('getGridParam', 'page');
//        options.$this.jqGrid('setSelection',6);
        options.$this.setGridParam({
            page: page
        }).trigger("reloadGrid");

    }

    var colModelProperty = {
        align: 'center',    //每行显示的位置
        classes: 'xrc_row xrc_row_Bar',
        cellLayout: 0
    };

    /**
     * 返回合成后的options
     * @returns {*}
     * @constructor
     */
    function MergeTableDataProperty() {
        var oldTableProperty = options.colModel;
        for (var i = 0; i < oldTableProperty.length; i++) {
            if (true) {     //如果没有name
                oldTableProperty[i].name = oldTableProperty[i].index;
            }
            oldTableProperty[i] = $.extend({}, oldTableProperty[i], colModelProperty);
        }
        return oldTableProperty
    }

    /**
     * 重载表格
     * @param $this
     */
    function reloadGrid($this) {
        $this.setGridParam({
            page: 1
        }).trigger("reloadGrid");
    }

    /**
     * 创建表格
     * @param $this
     */
    function createGrid($this) {
        mygrid = $this.jqGrid({
            datatype: options.datatype,
            colNames: options.colNames,
            colModel: MergeTableDataProperty(),
            altRows: true,  //是否允许表格交替行变色
            altclass: options.altclass,
            viewrecords: options.viewrecords,  //是否要显示总记录数
            rowNum: options.rowNumb,
            rowList: options.rowList,
            pager: options.pager,
            pagerpos: options.pagerpos,//分页栏位置
            cellEdit: options.pagerpos,
            page: options.page,
            shrinkToFit: options.shrinkToFit,  //如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用 colModel指定的宽度
            onPaging: options.onPaging,
            autowidth: options.autowidth,//控制jqgrid的宽度
            width: options.width,
            height: options.height,
            multiselect: options.multiselect,
            gridComplete: options.gridComplete,
            onSelectAll: options.onSelectAll,
            onSelectRow: options.onSelectRow,
            pginput:false,
//            refresh:false,
//            search:false
            emptyrecords: options.emptyrecords//如果分页没有参数

        }).navGrid(options.pager, {
                edit: false,
                add: false,
                del: false,
                refresh:false,
                search:false
            });
        for (var i = 0; i <= options.data.length; i++) {
            $this.jqGrid('addRowData', i + 1, options.data[i]);
//            delRightBar($this);
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
            return this.each(function () {
                options = $.extend({}, options, $.fn.xrJQgrid.defaults, initOptions);
                var $this = $(this);
                options.$this = $this;
                createGrid($this);   //根据数据创建表格
                reloadGrid($this);   //重新载入表格
                delRightBar();   //去除每一行最后一格右侧的竖线
                removeLastHeaderBar(); //去除头部行最后一格右侧的竖线
                amendPager();
            });
        },
        /**
         * 修改分页
         */
        amendPager:function(){
            amendPager();
        },
        /**
         * 获取所有复选框的ids
         */
        getAllSelected: function () {
            var $this = $(this);
            return $this.jqGrid("getGridParam", "selarrrow");
        },
        /**
         * 返回选中行的数据
         */
        getSelectData: function (ids) {

            return $(this).jqGrid("getRowData", ids);
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
         * @param key
         * @param value
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

    var methodName = "xrJQgrid";

    var options = {
        data: [],
        datatype: "local",
        rowNumb: 5,
        "width": 980,
        "height": 'auto',
        altRows: true,  //是否允许表格交替行变色
        altclass: '',
        viewrecords: false,  //是否要显示总记录数
        rowList: [5, 10, 20, 30],
        pager: "#gridPager",
        pagerpos: "center",//分页栏位置
        page: 1,
        shrinkToFit: true,  //如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用 colModel指定的宽度
        onPaging: uppage,
        autowidth: false,//控制jqgrid的宽度
        width: 980,
        height: 'auto',
        emptyrecords:"暂时没有数据"
    };

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrJQgrid = function () {
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
    $.fn.xrJQgrid.defaults = {          // wangyq : 5
        errorTip: 'hell'
    };
})(jQuery);


