
(function () {
    $.namespace('xrui');

    xrui.buildTime = function () {
        return "2014/01/18 13:11:59";
    };
    xrui.codeTime = function () {
        return "2014/01/08 10:18:10";
    };
    xrui.version = function () {
        return "1.0.0.1847";
    };
    xrui.copyRight = function () {
        return "http://www.xrpension.com";
    };
}).apply(this);

(function ($) {
    /**
     * 判断当前url是否和子菜单中某一项相同，如果相同则高亮该子菜单，并展开父菜单
     * @param {object} $this -   操作当前dom的对象
     * @param {json} options -   创建html源码的数据
     */
    function runByUrl($this, options) {
        var url = window.location.href; //获取到当前的url地址
        var classNames = options.className.split(" ");
        var parentLis = $this.find("ul").children();

        for (var i = 0; i < parentLis.length; i++) {
            var childLis = $(parentLis[i]).find("ul").children();
            for (var j = 0; j < childLis.length; j++) {
                if (url.indexOf($(childLis[j]).find("a").attr("href")) > -1) {
                    parentLis.removeClass(classNames[0]);
                    parentLis.find("ul").css({"display": "none"});
                    parentLis.find("a").removeClass(classNames[1]);
                    parentLis.find("a").removeClass(classNames[3]);
                    // 根据要求添加样式
                    $(childLis[j]).find("a").addClass(classNames[3]);
                    $(childLis[j]).parent().css({"display": "block"})
                    $(childLis[j]).parent().parent().find("a").addClass(classNames[1]);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 创建手风琴html源码
     * @param {object} $this -   操作当前dom的对象
     * @param {json} options -    创建html源码的数据
     **/
    function createAccordionMenuHtml($this, options) {
        var o = options.data;

        var className = options.className;  //创建html代码使用的类
        var classNames = className.split(" ");
        //将元素集合赋给变量
        var parentUl = $("<ul></ul>").addClass(classNames[0]);
        for (var i = 0; i < o.length; i++) {
            var parentLi = $("<li></li>");
            var This = o[i];
            parentLi.addClass(This.liClass).attr("xrIndex", This.index)
                .append($("<a></a>").attr({"href": This.url}).html(This.title));
            if (This.item.length > 0)//判断是否存在子项
            {
                var childLis = This.item;
                var childUl = $("<ul></ul>");
                childUl.addClass(classNames[2]);
                for (var j = 0; j < childLis.length; j++) {
                    var childLi = $("<li></li>");
                    childUl.append(
                        childLi.addClass(childLis[j].liClass).attr("xrIndex", childLis[j].index)
                            .append(
                                $("<a></a>").attr({"href": childLis[j].url, "id": childLis[j].id}).html(childLis[j].title)
                            )
                    );
                    if (options.postLoad != null) {
                        try {
                            postLoad(i, j);
                        } catch (e) {
                        }
                    }
                    parentLi.append(childUl);
                }
            }
            parentUl.append(parentLi);
        }
        $this.append(parentUl);
        accordionRun(parentUl, classNames);
    }

    /**
     * 手风琴运行函数
     * @param {object} parentUl - 当前操作的dom对象
     * @param {json} classNames - 控制菜单的css样式
     **/
    function accordionRun(parentUl, classNames) {
        var accordion_head = parentUl.children().find("a:first"),
            accordion_body = parentUl.find("li").find("ul");
        // Open the first tab on load  --页面夹在时，打开第一个tab
        accordion_head.first().addClass(classNames[1]).next().slideDown('normal');
        // Click function当点击菜单的时候
        accordion_head.on('click', function (event) {
            // Disable header links
            event.preventDefault();
            // Show and hide the tabs on click
            if ($(this).attr('class') != classNames[1]) {
                //  alert("here is"+$(this).html());
                accordion_body.slideUp('normal');
                $(this).next().stop(true, true).slideToggle('normal');
                accordion_head.removeClass(classNames[1]);
                $(this).addClass(classNames[1]);
            }
        });

    }

    /**
     * 公共方法体
     * @type {{init: Function, destroy: Function, select: Function, selectIndex: Function, option: Function}}
     */
    var methods = {
        /**
         * 初始化函数
         * @param initOptions
         * @returns {*}
         */
        init: function (initOptions) {
            return this.each(function () {
                options = $.extend({}, $.fn.xrAccordionMenu.defaults, initOptions);
                var $this = $(this);
                createAccordionMenuHtml($this, options);
                runByUrl($this, options)
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
         * 根据参数对菜单进行控制
         * @param parent  - 一级菜单参数
         * @param child   - 二级菜单参数
         * @returns {boolean} -返回的结果
         */
        select: function (parent, child) {
            var opts = $.fn.xrAccordionMenu.defaults;
            var classNames = opts.className.split(" ");
            var parentLis = $(this).find("ul").children();
            var result = false;
            for (var i = 0; i < parentLis.length; i++) {
                var childLis = $(parentLis[i]).find("ul").children();
                for (var j = 0; j < childLis.length; j++) {
                    if (child == (j + 1) && parent == (i + 1)) {
                        // 去除所有初始样式
                        parentLis.removeClass(classNames[0]);
                        parentLis.find("ul").css({"display": "none"});
                        parentLis.find("a").removeClass(classNames[1]);
                        parentLis.find("a").removeClass(classNames[3]);
                        // 根据要求添加样式
                        $(childLis[j]).find("a").addClass(classNames[3]);
                        $($(parentLis[parent - 1]).find("ul")[0]).css({"display": "block"});
                        $($(parentLis[parent - 1]).find("a").addClass(classNames[1]));
                        return true;
                    }

                }
            }
            return false;
        },
        /**
         * 根据索引对菜单进行控制
         * @param index    - 控制菜单的索引
         * @returns {boolean}
         */
        selectIndex: function (index) {
            var opts = $.fn.xrAccordionMenu.defaults;
            var classNames = opts.className.split(" ");
            var parentLis = $(this).children().children();
            for (var i = 0; i < parentLis.length; i++) {
                var childLis = $(parentLis[i]).find("li")
                for (j = 0; j < childLis.length; j++) {
                    if (index == $(childLis[j]).attr("xrIndex")) {
                        // 去除所有初始样式
                        parentLis.removeClass(classNames[0]);
                        parentLis.find("ul").css({"display": "none"});
                        parentLis.find("a").removeClass(classNames[1]);
                        parentLis.find("a").removeClass(classNames[3]);
                        // 根据要求添加样式
                        $(childLis[j]).find("a").addClass(classNames[3]);
                        $($(parentLis[i]).find("ul")[0]).css({"display": "block"});
                        $($(parentLis[i]).find("a").addClass(classNames[1]));
                        return true;
                    }
                }
            }

            return false;
        },
        selectUrl:function(url)
        {
            var options = $.fn.xrAccordionMenu.defaults;
            var classNames = options.className.split(" ");
            var parentLis = $(this).find("ul").children();

            for (var i = 0; i < parentLis.length; i++) {
                var childLis = $(parentLis[i]).find("ul").children();
                for (var j = 0; j < childLis.length; j++) {
                    if (url.indexOf($(childLis[j]).find("a").attr("href")) > -1) {
                        parentLis.removeClass(classNames[0]);
                        parentLis.find("ul").css({"display": "none"});
                        parentLis.find("a").removeClass(classNames[1]);
                        parentLis.find("a").removeClass(classNames[3]);
                        // 根据要求添加样式
                        $(childLis[j]).find("a").addClass(classNames[3]);
                        $(childLis[j]).parent().css({"display": "block"})
                        $(childLis[j]).parent().parent().find("a").addClass(classNames[1]);
                        return true;
                    }
                }
            }
            return false;
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

    var methodName = "xrAccordionMenu";

    var options = {};

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrAccordionMenu = function () {
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
    $.fn.xrAccordionMenu.defaults = {
        data: [],
        className: "xrui-AccordionMenu xrui-Accordion-active xrui-AccordionSecondNav xrui-AccordionSecondNav-active",
        postLoad: null
    };
})(jQuery);
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

        var data = options.data;
        var dataArray;
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
            dataArray = data.split(",");
            current_page = parseInt(dataArray[0]);
            pageNums = parseInt(dataArray[1]);
            total_page = parseInt(dataArray[2]);
            pageSendId = dataArray[3];
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
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum":"#"}));
                    for (i = total_page - tailer_length; i < total_page; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }
                }
                //第二种情况是右边没有...
                else if (current_page >= total_page - offset) {
                    for (i = 0; i < header_length; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }

                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum":"#"}));
                    for (var i = total_page - pager_length; i <= total_page; i++) {
                        pageDiv.append(( current_page != i ) ? $("<a></a>").html(i).attr({"href": "#", "pageNum": i}) : $("<a></a>").html(i).attr({"href": "#", "pageNum": i}).addClass(pageCur));
                    }
                }
                //最后一种情况，两边都有...
                else {
                    for (i = 0; i < header_length; i++) {
                        pageDiv.append($("<a></a>").html(i + 1).attr({"href": "#", "pageNum": i + 1}));
                    }
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum":"#"}));
                    for (var i = current_page - 2; i <= current_page + 2; i++) {
                        pageDiv.append(( current_page != i ) ? $("<a></a>").html(i).attr({"href": "#", "pageNum": i}) : $("<a></a>").html(i).attr({"href": "#", "pageNum": i}).addClass(pageCur));
                    }
                    pageDiv.append($("<a></a>").html("...").attr({"href": "#", "pageNum":"#"}));
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
            pageDiv.append($("<input/>").attr({"type": "hidden", "value":current_page, "id": pageSendId + CurrentPageNo}));
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
        var cId="#"+options.data.split(",")[3]+"_FormPager_CurrentPageNo";
        allAs.each(function (i, val) {
            $(val).click(function () {
                var ThisId = $(this).attr("pageNum");
                if(ThisId!="#"){
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

(function ($) {
    /**
     * 创建滑块的html源码
     * @param  object $this -当前传入的dom元素操作对象
     */
    function createHtml($this) {
        var className = options.classNames;    //获取创建html时所需要的样式
        var newImgUl = $("<ul></ul>").addClass(className.overview);  //创建滚动图片的容器ul
        var newSliderUl = $("<ul></ul>").addClass(className.page);    //创建滑块的容器ul
        for (var i = 0; i < options.data.length; i++) {
            var opts = options.data[i];
            var imgDiv = null;
            if (opts.title != null && opts.content != null) {  //如果有内容和标题
                imgDiv = $("<div><div><a><img/></a></div><div><p><a></a></p><p></p></div></div>");
                imgDiv.addClass(className.inner + " " + className.group);
                imgDiv.find("div:eq(0)").addClass(className.innerImg);
                imgDiv.find("div:eq(0)").find("a:eq(0)").attr({"href": opts.url});
                imgDiv.find("div:eq(0)").find("img:eq(0)").attr({"src": opts.img}).addClass(className.hasConImg);
                imgDiv.find("div:eq(1)").addClass(className.innerContent);
                imgDiv.find("div:eq(1)").find("p:eq(0)").find("a:eq(0)").attr({"href": opts.url}).html(opts.title);
                imgDiv.find("div:eq(1)").find("p:eq(1)").html(opts.content);
            }
            else     //没有内容和标题
            {
                imgDiv = $("<div><div><a><img/></a></div></div>");
                imgDiv.addClass(className.inner + " " + className.group);
                imgDiv.find("div:eq(0)").addClass(className.innerImg);
                imgDiv.find("div:eq(0)").find("a:eq(0)").attr({"href": opts.url});
                imgDiv.find("div:eq(0)").find("img:eq(0)").attr({"src": opts.img});
            }
            newImgUl.append($("<li></li>").append(imgDiv));
            newSliderUl.append($("<li></li>").append($("<a></a>").addClass(className.pagenum).html(i + 1).attr({"href": "#"})));
        }
        $this.append(newImgUl).append(newSliderUl).addClass("xrui-ImgSlider"); //将创建的html代码放入指定的页面元素块中
    }

    /**
     * 运行滑块滚动图片
     * @param object $this -当前传入的dom元素操作对象
     */
    function sliderRun($this) {
        var pager = "." + options.classNames.page;  //滑块整体的样式
        var active = options.classNames.sliderActive;  //滑块有背景的样式
        var inactive = options.classNames.sliderUnActive; //滑块无背景的样式
        var allAs = $this.find(pager + " li").children("a");   //获取滑块中所有的超链接
        var imgHeights = $this.find("img");            //获取所有的滚动图片dom操作对象
        var len = options.data.length; //图片数量--滚动数量
        var heightArray = new Array();
        for (var i = 0; i < len; i++) {  //将图片高度存放到数组里
            if (0 == i) {
                heightArray.push(0);
            }
            else {
                var thisHeight = 0;
                for (var j = 0; j < i; j++) {
                    thisHeight += imgHeights[j].height;
                }
                heightArray.push(thisHeight);
            }
            console.log(heightArray[i]);
        }

        for (var i = 0; i < allAs.length; i++) {     //初始化，给每个滑块添加样式
            if (i == 0) {
                $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).addClass(active);
            }
            else {
                $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).addClass(inactive);
            }
            allAs[i].i = i;
            $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).click(function () { //为每个滑块添加点击事件
                $(window).scrollTop(heightArray[this.i]);
                return false;
            });
        }
        //根据滚动条滚动来判断，给页面滑块元素添加或去除样式
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop < heightArray[1]) {       //滚动高度小于第一张图片加第一张图片离网页顶部的高度
                $this.find(pager + " li").children("a.active").removeClass(active);
                $this.find(pager + " li").children("a.inactive").removeClass(inactive);
                for (var j = 0; j < len; j++) {
                    $this.find(pager + " li:eq(" + j + ")").children("a").eq(0).addClass(inactive);
                }
                $this.find(pager + " li:eq(0)").children("a").eq(0).removeClass(inactive);
                $this.find(pager + " li:eq(0)").children("a").eq(0).addClass(active);
            }
            for (var i = 1; i < heightArray.length; i++) {
                if (i < heightArray.length - 1) {
                    if (scrollTop >= heightArray[i] && scrollTop <= heightArray[i + 1]) {        //滚动高度大于或等于滚动过的图片总高度加第一张图片离网页顶部的高度
                        $this.find(pager + " li").children("a.active").removeClass(active);
                        $this.find(pager + " li").children("a.inactive").removeClass(inactive);
                        for (var j = 0; j < len; j++) {
                            $this.find(pager + " li:eq(" + j + ")").children("a").eq(0).addClass(inactive);
                        }
                        $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).removeClass(inactive);
                        $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).addClass(active);
                    }
                }
                else {
                    if (scrollTop >= heightArray[i]) {        //滚动高度大于或等于滚动过的图片总高度加第一张图片离网页顶部的高度
                        $this.find(pager + " li").children("a.active").removeClass(active);
                        $this.find(pager + " li").children("a.inactive").removeClass(inactive);
                        for (var j = 0; j < len; j++) {
                            $this.find(pager + " li:eq(" + j + ")").children("a").eq(0).addClass(inactive);
                        }
                        $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).removeClass(inactive);
                        $this.find(pager + " li:eq(" + i + ")").children("a").eq(0).addClass(active);
                    }
                }
            }
        });
    }

    //public method
    var methods = {
        init: function (initOptions) {
            options = $.extend({}, $.fn.xrImgSlider.defaults, initOptions);
            return this.each(function () {
                var $this = $(this);
                createHtml($this);
                var imgNum = $this.find("img").length;
                if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || (navigator.userAgent.indexOf("MSIE 7.0") > 0) || (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth)) {
                    sliderRun($this);
                }
                else {
                    $.ajaxSetup({ cache: false });
                    $this.find("img").load(function () {
                        if (!--imgNum) {
                            sliderRun($this);
                        }
                    });
                }
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

    var methodName = "ImgSlider";

    var options = {};

    /**
     *  插件入口
     */
    $.fn.xrImgSlider = function () {
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
     * 插件接收的数据
     * @type {{data: Array, classNames: {inner: string, group: string, innerImg: string, hasConImg: string, innerContent: string, overview: string, page: string, pagenum: string, sliderActive: string, sliderUnActive: string}}}
     */
    $.fn.xrImgSlider.defaults = {
        data: [],
        classNames: {
            inner: "xrui-ImgSlider-inner",
            group: "xrui-ImgSlider-group",
            innerImg: "xrui-ImgSlider-innerImg",
            hasConImg: "xrui-hasConImg",
            innerContent: "xrui-ImgSlider-innerContent",
            overview: "xrui-ImgSlider-overview",
            page: "xrui-ImgSlider-pager",
            pagenum: "xrui-ImgSlider-pagenum",
            sliderActive: "active",
            sliderUnActive: "inactive"
        }
    };
})(jQuery);
