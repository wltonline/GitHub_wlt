
(function ($) {

    /**
     * 返回菜单传入的数据类型，是使用图片还是文字
     * @param opts
     * @returns {null}
     */
    function getNavType(opts) {
        var type = null;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].text) {
                type = "text";
                return type;
            } else {
                type = "code";
                return type;
            }
        }
    }

    /***
     * 判断二级菜单是自定义区域，还是常规菜单
     * @param opts
     * @returns {boolean}
     */
    function getAreaType(opts) {
        var type = false;
        if (opts.secNav.length) {
            for (var i = 0; i < opts.secNav.length; i++) {
                if (opts.secNav[i].area) {
                    type = true;
                    return type;
                }
                else {
                    return type;
                }
            }
        } else {
            if (opts.secNav.text) {
                return type;
            }
            else {
                type = true;
                return type;
            }
        }
    }

    var navCss = {   // wangyq 3     jquery ui        --jquery ui是直接将样式写入 代码中 ，使用json是为了方便调试
        navMenu: "xr_navMenu ",
        firNavCssName: "xr_navMenu_firNav",  //一级菜单通用的样式
        secBg: "xr_secNav_init",
        secBgHover: "xr_secNav_hover"
    }

    /**
     * 创建一级菜单
     * @param $this
     * @param type
     * @returns {*}
     */
    function createFirNav($this, type) {
        var firNav = $("<li></li>").addClass(navCss.firNavCssName + " " + xrb.css.itemEventName(type, "init"))
            .css({"width": options.pw,
                "height": options.h})
            .mouseover(function () {
                if (type == "text") {
                    $(this).parent().children().children().hide();
                    $(this).parent().children().find("a:eq(0)").show().removeClass(xrb.css.itemEventName(type, "hover"));
                    $(this).parent().children().find("a:eq(0)").show().addClass(xrb.css.itemEventName(type, "init"));
                    $(this).parent().children().find("a:eq(0)").show().removeClass(xrb.css.itemEventName(type, "select"));
                    $(this).children().show().addClass(xrb.css.itemEventName(type, "hover"));
                }
                else {
                    $(this).find("a:eq(0)").removeClass(xrb.css.itemEventName($this.code, "init"));
                    $(this).find("a:eq(0)").addClass(xrb.css.itemEventName($this.code, "hover"));
                    $(this).children().show();
                }
            }).mouseout(function () {
                $(this).parent().children().find("ul").hide();
                if (type == "code") {
                    $(this).find("a:eq(0)").removeClass(xrb.css.itemEventName($this.code, "hover"));
                    $(this).find("a:eq(0)").addClass(xrb.css.itemEventName($this.code, "init"));
                }

            });//创建一级

        if (type == "text")  //如果菜单为文字
        {
            var thisA = $("<a></a>").html($this.text)
                .attr({"href": $this.url})
                .addClass(xrb.css.itemEventName($this.code, "init") + " " + xrb.css.itemEventName(type, "init") + " " + xrb.css.itemEventName($this.icon, "icon"))
                .css({"display": "block", "width": options.pw, "height": options.h, "line-height": options.h + "px"})
            firNav.append(thisA); //添加超链接文字和链接
        } else {      //如果菜单为背景图
            firNav.append(
                $("<a></a>")
                    .attr({"href": $this.url})
                    .addClass(xrb.css.itemEventName($this.code, "init") + " " + xrb.css.itemEventName($this.icon, "icon"))
                    .css({"display": "block", "width": options.pw, "height": options.h})); //添加背景图片和超链接
        }
        return firNav;
    }

    /**
     *创建二级菜单
     * @param $this
     * @param type
     * @returns {*}
     */
    function createSecNav($this, type) {
        var secNav = $("<ul></ul>").css({"top": options.h, "display": "none"}).mouseover(function () {

        }).mouseout(function () {
                $(this).hide();
                $(this).find("a").removeClass(xrb.css.itemEventName(type, "hover"));
            });  //创建二级
        if ($this.secNav.length) {  //如果二级菜单有多个菜单项
            for (var i = 0; i < $this.secNav.length; i++) {
                var secTexts = $this.secNav[i];
                $this.secNav[i].i = i;
                if (type == "text") {
                    secNav.append(                 //创建二级文字版子菜单
                        $("<li></li>").css({"height": options.h}).append(
                            $("<a></a>").attr({"href": secTexts.url})
                                .html(secTexts.text)
                                .addClass(xrb.css.itemEventName(type, "init") + " " + xrb.css.itemEventName(secTexts.icon, "icon"))
                                .css({"display": "block", "width": options.cw, "height": options.h, "line-height": options.h + "px"})
                                .mouseover(function () {
                                    xrb.setChildClass($(this).parent().parent(), $(this), xrb.css.itemEventName(type, "hover"));
                                }
                            )
                        ));
                }
                else {
                    secNav.append(                 //创建二级图片版子菜单
                        $("<li></li>").css({"height": options.h}).addClass(xrb.css.itemEventName(secTexts.code, "init")).append(
                            $("<a></a>").attr({"href": secTexts.url, "key": i})
                                .addClass(xrb.css.itemEventName(secTexts.code, "init"))
                                .css({"display": "block", "width": options.cw, "height": options.h, "line-height": options.h + "px"})
                                .mouseover(function () {
                                    $(this).removeClass(xrb.css.itemEventName($this.secNav[$(this).attr("key")].code, "init"));
                                    $(this).addClass(xrb.css.itemEventName($this.secNav[$(this).attr("key")].code, "hover"));
                                }).mouseout(function () {
                                    $(this).addClass(xrb.css.itemEventName($this.secNav[$(this).attr("key")].code, "init"));
                                    $(this).removeClass(xrb.css.itemEventName($this.secNav[$(this).attr("key")].code, "hover"));
                                })
                        ));
                }
            }
        } else {      //如果二级菜单有且只有一个菜单项
            var secTexts = $this.secNav;
            secNav.append(                 //创建二级子菜单
                $("<li></li>").css({"height": options.h}).append(
                    $("<a></a>").attr({"href": secTexts.url})
                        .html(secTexts.text)
                        .addClass(xrb.css.itemEventName(type, "init") + " " + xrb.css.itemEventName(secTexts.icon + "icon"))
                        .css({"display": "block", "width": options.cw, "height": options.h, "line-height": options.h + "px"})
                        .mouseover(function () {
                            xrb.setChildClass($(this).parent().parent(), $(this), xrb.css.itemEventName(type, "hover"));
                        }
                    )
                ));
        }
        return secNav;
    }

    /**
     *创建自定义区域菜单
     * @param $this
     * @returns {*}
     */
    function createSecArea($this) {
        var secNav = $("<ul><li><div></div></li></ul>")
            .css({"top": options.h, "display": "none"})
            .mouseout(function () {
                $(this).hide();
            });
        secNav.find("div:eq(0)")
            .html($this.secNav.area);
        return secNav;
    }

    /**
     *创建菜单入口
     * @param navMenu
     * @param opts
     * @param type
     * @returns {*}
     */
    function createNavMenu(navMenu, opts, type) {
        for (var i = 0; i < opts.length; i++)    //循环一级菜单
        {
            var firNav = createFirNav(opts[i], type, options); //创建一级菜单
            if (opts[i].secNav) {   //判断是否存在二级菜单
                var secNav = null;
                if (!getAreaType(opts[i])) {     //如果是下拉菜单
                    secNav = createSecNav(opts[i], type, options); //创建二级菜单
                    firNav.append(secNav);     //将二级菜单添加进入一级菜单
                }
                else {           //如果是自定义区域菜单
                    secNav = createSecArea(opts[i], options);
                    firNav.append(secNav);
                }
            }
            navMenu.append(firNav);     //将每一个菜单项添加进菜单中
        }
        return navMenu;
    }

    /**
     * 创建html源码
     * @param {object} $this -   操作当前dom的对象
     **/
    function createHtml($this) {
        var opts = options.data;
        var type = null;
        var navMenu = $("<div><ul></ul></div>")
            .find("ul:eq(0)")
            .addClass(navCss.navMenu)
            .css({"height": options.h}); //定义整个菜单的外部结构和外观
        if (getNavType(opts) != "text") //如果菜单是图片
        {
            type = "code";
            navMenu = createNavMenu(navMenu, opts, type, options);//创建图片菜单
        }
        else    //如果菜单是文字
        {
            type = "text";
            navMenu = createNavMenu(navMenu, opts, type, options); //创建文字菜单
        }
        $this.append(navMenu);

        if (type == "text") {
            $(navMenu).find("a:eq(0)").addClass(xrb.css.itemEventName(type, "select"));
        } else {
            $(navMenu).find("a:eq(0)").removeClass(xrb.css.itemEventName(opts[0].code, "init"));
            $(navMenu).find("a:eq(0)").addClass(xrb.css.itemEventName(opts[0].code, "select"));
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
                options = $.extend({}, options, $.fn.xrNavMenu.defaults, initOptions);
                var $this = $(this);
                createHtml($this);
            });
        },
        select: function (code) {
            var init = xrb.css.itemEventName(code, "init");
            var select = xrb.css.itemEventName(code, "select");
            var allAs = $(this).find("a");
            var firstA = $(this).find("a:eq(0)").html();
            if ($(this).find("a:eq(0)").html() != "") {
                for (var i = 0; i < allAs.length; i++) {
                    if (!$.isEmptyObject($(allAs[i]).attr("class"))) {
                        var thisA = $(allAs[i]);
                        var cssName = thisA.attr("class");
                        var cssNames = xrb.css.parseItemEvent(cssName);
                        if (cssName.indexOf("select") > -1) {
                            for (var j = 0; j < cssNames.length; j++) {
                                if (cssNames[j].indexOf("select") > -1) {
                                    var thisCss = cssNames[j].replace("select", "init");
                                    $("." + cssNames[j]).addClass(thisCss);
                                    $("." + cssNames[j]).removeClass(cssNames[j]);
                                }
                            }
                        }
                        if (thisA.attr("class").indexOf(init) > -1) {
                            thisA.removeClass(xrb.css.itemEventName("text", "init"));
                            thisA.addClass(xrb.css.itemEventName("text", "select"));
                        }
                    }
                }
            } else {
                for (var i = 0; i < allAs.length; i++) {
                    if (!$.isEmptyObject($(allAs[i]).attr("class"))) {
                        var thisA = $(allAs[i]);
                        var cssName = thisA.attr("class");
                        var cssNames = xrb.css.parseItemEvent(cssName);
                        if (cssName.indexOf("select") > -1) {
                            for (var j = 0; j < cssNames.length; j++) {
                                if (cssNames[j].indexOf("select") > -1) {
                                    var thisCss = cssNames[j].replace("select", "init");
                                    $("." + cssNames[j]).addClass(thisCss);
                                    $("." + cssNames[j]).removeClass(cssNames[j]);
                                }
                            }
                        }
                        if (thisA.attr("class").indexOf(init) > -1) {
                            thisA.removeClass(init);
                            thisA.addClass(select);
                        }
                    }
                }
            }
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

    var methodName = "xrNavMenu";

    var options = {
        data: [],
        "pw": 100,
        "cw": 100,
        "h": 32
    };

    /**
     * 插件入口
     * @returns {*}
     */
    $.fn.xrNavMenu = function () {
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
    $.fn.xrNavMenu.defaults = {          // wangyq : 5
        errorTip: 'hell'
    };
})
    (jQuery);

