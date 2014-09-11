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

