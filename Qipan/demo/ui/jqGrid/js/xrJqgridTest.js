$(window).load(function () {
    //表头名称
    var colNames = ['未处理订单', '新订单留言', '待处理售后服务', '未处理缺货登记', '商品库存报警', '未处理购买咨询', '未处理商品评论', '商店新留言', '修改', '删除'];
    var colModel = [
//        {  index: 'importbool',
//            width: 100,
//            align: 'center',
//            sortable: false,    //是否排序
//            editable: true,
//            edittype: "checkbox",
//            editoptions: { value: "True:False"}},
        {
            index: 'untreatedOrder',
            sortable: false,
//            cellattr: addCellAttr,
            width: 100
        },
        {
            index: 'newOrderMsg',
            width: 100,
            sortable: false    //是否排序
//            cellattr: addCellAttr
        },
        {
            index: 'afterSalesServer',
            sortable: false,
            cellattr: addCellAttr,
            width: 120
        },
        {
            index: 'wantBook',
            sortable: false,
            cellattr: addCellAttr,
            width: 130
        },
        {
            index: 'shoppingWarn',
            sortable: false,
            width: 130,
            cellattr: addCellAttr

        },
        {
            index: 'buyAsking',
            sortable: false,
            cellattr: addCellAttr,
            width: 130
        },
        {
            index: 'productReviews',
            sortable: false,
            cellattr: addCellAttr,
            width: 130
        },
        {
            index: 'newMsg',
            width: 100,
            cellattr: addCellAttr,
            sortable: false
        } ,
        { name: 'Edit', index: 'Edit', sortable: false, align: "center", width: "60px" },
        { name: 'Delete', index: 'Delete', sortable: false, align: "center", width: "60px" }

    ];  //数据项
    var mydata = [
        {
            untreatedOrder: "111条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "<a href='http://www.baidu.com'>xxx条</a>",
            productReviews: "0条",
            newMsg: "ccc条"
        },
        {
//            importbool:true,
            untreatedOrder: "112条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "113条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "114条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "115条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "116条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "117条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "118条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "119条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "120条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "121条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "122条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "3条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "3条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "3条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        },
        {
            untreatedOrder: "3条",
            newOrderMsg: "0条",
            afterSalesServer: "0条",
            wantBook: "0条",
            shoppingWarn: "0条",
            buyAsking: "0条",
            productReviews: "0条",
            newMsg: "3条"
        }
    ];  //数据
//    var d=new Date(1322195034000);
//    alert()
//    var ssd="";
    $("#gridTable").xrJQgrid({ onSelectRow: rememberSelectRow, data: mydata, colModel: colModel, colNames: colNames, pager: "#gridPager", width: 940, multiselect: true, gridComplete: addDelandAmend, multiselect: true, viewrecords: true});
//    var dd=$("#gridTable").xrJQgrid("getSelectData",3);
//    alert("dd="+dd.productReviews);
    outPutSelect();
    $("#choiceTwo").click(function () {
        choiceThis();
    })
    $("#delAllSelect").click(function () {
        delAllSelected()
    })
    $("#selectChoice").click(function () {
        showRemChoice()
    })
    $("#addNewMsg").click(function () {
        addNewMsg(1)
    })
});

/**
 * 记忆选中的行
 * 将选中行的checkbox的ID存入cookie中
 */
function rememberSelectRow() {
    var ids = $("#gridTable").xrJQgrid("getAllSelected");
    for (var i = 0; i < ids.length; i++) {
        if (!$.cookie("xrJqgrid")) {
            $.cookie("xrJqgrid", ids[i]);
        } else {
            if (!($.cookie("xrJqgrid").indexOf(ids[i]) > -1)) {
                $.cookie("xrJqgrid", $.cookie("xrJqgrid") + "," + ids[i]);
            }
        }
    }
    return $.cookie("xrJqgrid");
}


/**
 * 修改指定数据的格式和响应事件
 * @param rowId
 * @param val
 * @param rawObject
 * @param cm
 * @param rdata
 * @returns {string}
 */
function addCellAttr(rowId, val, rawObject, cm, rdata) {   //改变指定颜色
    if (val != "0条") {
        return "style='color:green'";
    }
}

/**
 * 添加删除和修改的入口
 */
function addDelandAmend() {
    var ids = jQuery("#gridTable").jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var EditBtn = "<a href='#' style='color:#f60' onclick='xrcJQgridEdit(" + id + ")' >修改</a>";
        var DeleteBtn = "<a href='#' style='color:#f60' onclick='xrcJQgridDelete(" + id + ")' >删除</a>";
        jQuery("#gridTable").jqGrid('setRowData', ids[i], {Edit: EditBtn, Delete: DeleteBtn });
    }
}

/**
 * 删除方法，返回行ID
 * @param rowId
 */
function xrcJQgridDelete(rowId) {
    $("#gridTable").jqGrid('delRowData', rowId);
}

/**
 * 修改方法 返回行ID
 * @param rowId
 */
function xrcJQgridEdit(rowId) {
//    alert(rowId);
    var ss = $("#gridTable").jqGrid('getRowData', rowId);
    alert(ss.untreatedOrder)
}

/**
 * 按钮点击，显示有多少选中的行
 */
function outPutSelect() {
    $("#thisSelect").click(function () {
        var ids = $("#gridTable").xrJQgrid("getAllSelected");
        if (ids.length > 0) {
            alert("选中的行有："+ids);
        } else {
            alert("请选择行！");
        }
    });
}

/**
 * 选中指定行
 */
function choiceThis() {
    jQuery("#gridTable").jqGrid('setSelection', "2");
}

/**
 * 删除所有选中行
 */
function delAllSelected() {
    var selectedRowIds = $("#gridTable").jqGrid("getGridParam", "selarrrow");
    var len = selectedRowIds.length;
    for (var i = 0; i < len; i++) {
        $("#gridTable").jqGrid("delRowData", selectedRowIds[0]);
    }
    if ($.cookie("xrJqgrid")) {
        $.cookie("xrJqgrid", "");
    }
}

function showRemChoice() {
    if ($.cookie("xrJqgrid")) {
        alert("记忆选择的行有："+$.cookie("xrJqgrid"));
    } else {
        alert("暂无行被选中！")
    }
}

function addNewMsg(id){

    $("#gridTable").addRowData(id,  {
        untreatedOrder: "addNew",
        newOrderMsg: "1条",
        afterSalesServer: "121条",
        wantBook: "22条",
        shoppingWarn: "3条",
        buyAsking: "<a href='http://www.baidu.com'>xxx条</a>",
        productReviews: "ss条",
        newMsg: "xxx条"
    }, "first");
}