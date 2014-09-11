
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
                    xrb.callBack(options.postLoad, i, j);
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

