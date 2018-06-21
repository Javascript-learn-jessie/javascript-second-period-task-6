// import { loadAllItems } from "./datbase";

$(document).ready(function () {
    var items = loadAllItems();
    var promotionInfo=[];
    for (var i = 0; i < items.length; i++) {
        promotionInfo = promotionType(isPromotion(items[i].barcode))
        $("ul.items").append(`<span class=item-${i}><b class=item-${i}>${items[i].name}</b>&nbsp&nbsp<b class=price-${i}>${items[i].price} &yen;/${items[i].unit}</b></span>`);
        for(let info of promotionInfo){

            $(`b.price-${i}`).after(`&nbsp&nbsp<b class=prom-${i} style="color:red;font-size:10px" >${info}</b>&nbsp&nbsp`);
        }
        $(`span.item-${i}`).append(`&nbsp&nbsp数量：<input type='number' class='item-${i}num' min=0 style="width:5%">`);
        $(`input.item-${i}num`).after(`&nbsp&nbsp<button class=${i}-add2Car>加入购物车</button>`);
        $(`span.item-${i}`).after('<hr style="height:2px;border:none;border-top:2px dashed #555555;" />');
    }
    // console.log(111);
});
function isPromotion(barcode) {
    var promotions = loadPromotions();
    
    var promotion = [];
    for (var prom of promotions) {
        // console.log(prom);

        let barcodes = prom.barcodes;
        // console.log(barcodes);
        for (var code of barcodes) {
            if (barcode == code) {
                promotion.push(prom.type);
            }
        }
    }
    return promotion;
}
function promotionType(promotions) {
    var info = [];
    for (let promotion of promotions) {
        switch (promotion) {
            case "BUY_TWO_GET_ONE_FREE": info.push("买一赠一");
                break;
        }

    }
    return info;
}
