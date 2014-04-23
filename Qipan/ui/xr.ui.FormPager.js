(function ($) {
    /**
     * 创建分页源码
     * @param $this
     * @returns {boolean}
     */
    function createHtml($this) {
        var pageCName = "xr-paginator";
        var pageCur = "cur";
        var pagePreBtn = "pre_btn";
        var pageNextBtn = "next_btn";
        var pageMoreCN = "more";
        var pageNoMoreCN = "no_more";
        var pageNoPage = "no_page";
        var pageHavePage = "have_page";

        var CurrentPageNo = "_FormPager_CurrentPageNo";
        var current_page = 0;//当前页
        var pageNums = 0;     //每页显示多少数据
        var total_page = 0;  //总页数
        var pageSendId = "";  //提交的按钮id
        var pager_length = 6;    //不包next 和 prev 必须为奇数
        var header_length = 0;
        var tailer_length = 0;
        var nextPageHave = true;
        //header_length + tailer_length 必须为偶数
        var main_length = pager_length - header_length - tailer_length; //必须为奇数
        try {
            current_page = options.pageNow;
            pageNums = options.pageNumbs;
            total_page = options.allPages;
            pageSendId = options.sendBtnId;
        } catch (e) {
            console.log("错误" + e.message);
        }
        if (total_page >= current_page & total_page != 1) {   //如果存在可以分页的情况
            var pageDiv = $("<div></div>").addClass(pageCName);
            var PreBtn = $("<a></a>").addClass(pagePreBtn).attr({"href": "#"});
            var preBtnName = $("<i></i>").addClass(pageNoPage).html("上一页");
            PreBtn.append(preBtnName);
            pageDiv.append(PreBtn);
            if (total_page < current_page) {
                console.log("总页数不能小于当前页数");
                return false;
            }
            //判断总页数是不是小于 分页的长度，若小于则直接显示
            if (total_page < pager_length) {
                for (i = 0; i < total_page; i++) {
                    pageDiv.append((i + 1 != current_page) ? $("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}) : $("<a></a>").html(i + 1).addClass(pageCur).attr({"href": "#", "pageNum": i + 1}));
                }
            }
            //如果总页数大于分页长度，则为一下函数
            else {
                //先计算中心偏移量
                var offset = ( pager_length - 1) / 2;
                //分三种情况，第一种左边没有...
                if (current_page <= offset + 1) {
                    var tailer = '';
                    //前header_length + main_length 个直接输出之后加一个...然后输出倒数的    tailer_length 个
                    for (i = 0; i < header_length + main_length; i++) {
                        pageDiv.append((i + 1 != current_page) ? $("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}) : $("<a></a>").html(i + 1).addClass(pageCur).attr({"href": "#", "pageNum": i + 1}));
                    }
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum": "#"}));
                    for (i = total_page - tailer_length; i < total_page; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }
                }
                //第二种情况是右边没有...
                else if (current_page >= total_page - offset) {
                    for (i = 0; i < header_length; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }

                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum": "#"}));
                    for (var i = total_page - pager_length; i <= total_page; i++) {
                        pageDiv.append(( current_page != i ) ? $("<a></a>").html(i).attr({"href": "#", "pageNum": i}) : $("<a></a>").html(i).attr({"href": "#", "pageNum": i}).addClass(pageCur));
                    }
                }
                //最后一种情况，两边都有...
                else {
                    for (i = 0; i < header_length; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum": "#"}));
                    for (var i = current_page - 2; i <= current_page + 2; i++) {
                        pageDiv.append(( current_page != i ) ? $("<a></a>").html(i).attr({"href": "#", "pageNum": i}) : $("<a></a>").html(i).attr({"href": "#", "pageNum": i}).addClass(pageCur));
                    }
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum": "#"}));
                    for (i = total_page - tailer_length; i < total_page; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }
                }
            }
            var nextBtn = $("<a></a>").addClass(pageNextBtn).attr({"href": "#"});
            var nextBtnName = $("<i></i>").addClass(pageMoreCN).html("下一页");
            nextBtn.append(nextBtnName);
            var pageCount = $("<span></span>").html("共" + total_page + "页");
            pageDiv.append(nextBtn).append(pageCount);
            if (current_page > 1) {
                preBtnName.removeClass(pageNoPage);
                preBtnName.addClass(pageHavePage);
                PreBtn.attr({"href": "#", "pageNum": current_page - 1});
            } else {
                preBtnName.removeClass(pageHavePage);
                preBtnName.addClass(pageNoPage);
            }
            if (current_page < total_page) {
                nextBtnName.removeClass(pageNoMoreCN);
                nextBtnName.addClass(pageMoreCN);
                nextBtn.attr({"href": "#", "pageNum": current_page + 1});
            } else {
                nextBtnName.removeClass(pageMoreCN);
                nextBtnName.addClass(pageNoMoreCN);
            }
            pageDiv.append($("<input/>").attr({"type": "hidden", "value": current_page, "id": pageSendId + CurrentPageNo}));
            pageDiv.append($("<input/>").attr({"type": "hidden", "value": pageNums, "id": pageSendId + "xrCountPerPage"}));

            $this.append(pageDiv);

            $this.append($("<input/>").attr({"type": "submit", "id": "selectFormPage"}).css({"display": "none"}));
        } else {
            console.log("数据有误，分页情况不成立！");
        }
    }

    /**
     * 控制分页提交参数
     * @param $this
     */
    function formPageClick($this) {
        var allAs = $this.find("a");
        var cId = "#" + options.sendBtnId + "_FormPager_CurrentPageNo";
        allAs.each(function (i, val) {
            $(val).click(function () {
                var ThisId = $(this).attr("pageNum");
                if (ThisId != "#") {
                    alert(ThisId);
                    $(cId).attr({"value": ThisId});
                }
                $("#selectFormPage").submit();
            })
        })
    }

    //public method
    var methods = {
        init: function (initOptions) {
            options = $.extend({}, $.fn.xrFormPager.defaults, initOptions);
            var $this = $(this);
            return this.each(function () {
                createHtml($this);
                formPageClick($this)
            });
        },
        destroy: function () {
            return this.each(function () {
            });
        },
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

    var methodName = "xrFormPager";

    var options = {};

    /**
     *  插件入口
     */
    $.fn.xrFormPager = function () {
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


    $.fn.xrFormPager.defaults = {

    };
})(jQuery);

