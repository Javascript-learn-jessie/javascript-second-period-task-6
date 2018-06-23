
$(document).ready(function () {
    var itemInfo = decodeURI(getQueryVariable("items"));//字符串
    var itemObj = $.parseJSON(itemInfo);//对象
    let info = `名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)`;
    let promInfo;
    let totalInfo;
    let promPrice = 0;
    let isPromotion = false;//是否有优惠，没有在页面显示无
    let total = 0;
    for (let item of itemObj) {
        let promotion = item.promotion;
        let sum = 0;
        switch (promotion) {
            case "买二赠一": if (item.num > 2) {
                sum = (parseFloat(item.num) - 1) * parseFloat(item.price);
                promPrice += parseFloat(item.price);
                promInfo = `名称：${item.name}，数量：1${item.unit}`;
                $("span.promList").append(`<b font-size:20px>${promInfo}</b><br>`);
                isPromotion = true;
            }
                break;
            case "": sum = parseFloat(item.price) * parseFloat(item.num);
        }
        if (item.num <= 2) {
            sum = parseFloat(item.price) * parseFloat(item.num);
        }
        total += sum;
        let info = `名称：${item.name}，数量：${item.num}${item.unit}，单价：${item.price}(元)，小计：${sum}(元)`;
        $("span.goodsList").append(`<b font-size:20px>${info}</b><br>`);
    }
    if (!isPromotion) {
        $("span.promList").append(`<b font-size:20px>无</b><br>`);
    }
    $(`span.goodsList`).after('<hr style="height:2px;border:none;border-top:2px dashed #555555;" />');
    $(`span.promList`).after('<hr style="height:2px;border:none;border-top:2px dashed #555555;" />');
    totalInfo = `总计：${total}(元)<br>节省：${promPrice}(元)`;
    $("span.total").append(`<b font-size:20px>${totalInfo}</b><br>`);
    $(`span.total`).after('<hr style="height:2px;border:none;border-top:2px dashed #555555;" />');
});
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}