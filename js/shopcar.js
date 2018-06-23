
//var itemInfo = [];
$(document).ready(function () {
    var itemInfo = decodeURI(getQueryVariable("items"));//字符串
    var items = $.parseJSON(itemInfo);//对象
    for (var i = 0; i < items.length; i++) {
        promotionInfo = promotionType(isPromotion(items[i].barcode))
    $("span.goodsList").append(`<p>名称：${items[i].name}  数量：${items[i].num}  单价：${items[i].price} &yen/${items[i].unit} 
    <b style="color:red;font-size:10px">${items[i].promotion}<b></p>`);

    }
    $("button.pay").click(function () {
     //   let strInfo = JSON.stringify(itemInfo)
       window.location.href = `../html/payList.html?items=${itemInfo}`;
    })

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

