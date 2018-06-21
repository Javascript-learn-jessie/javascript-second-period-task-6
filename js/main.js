// const database = require('./datbase');
function initShopInventory(barcodes, allItems) {
    let buy_lists = [];
    var total_prices = 0;
    let goods_amount = {};
    let count = 0, code = barcodes[0];
    for (let barcode of barcodes) {
        if (barcode.search('-') != -1) {
            let goods = barcode.split('-');
            goods_amount[goods[0]] = Number(goods[1]);
            continue;
        }
        if (goods_amount[barcode] == undefined) {
            goods_amount[barcode] = 1;
        } else {
            goods_amount[barcode] += 1;
        }
    }
    for (let item of allItems) {
        if (goods_amount[item.barcode] != undefined) {
            var buy_goods = new Object();
            buy_goods.barcode = item.barcode;
            buy_goods.name = item.name;
            buy_goods.amount = goods_amount[item.barcode];
            buy_goods.price = item.price;
            buy_goods.unit = item.unit;
            buy_goods.subtotal = (item.price) * (buy_goods.amount);
            buy_lists.push(buy_goods);
            total_prices += buy_goods.subtotal;
        }
    }

    return [total_prices, buy_lists];

}
/*只适用于该题目需求中的优惠方式 */
function matchPromotion(allPromotions, buy_lists) {
    let promotionGoods = [];
    let promotionPrices = 0;
    let promotionBarcodes = allPromotions[0].barcodes;
    let buyLists = buy_lists;
    for (let item of buyLists) {
        for (let barcode of promotionBarcodes) {
            if (item.barcode == barcode) {
                item.subtotal -= item.price;
                promotionPrices += item.price;
                let goods = new Object();
                goods.type = allPromotions.type;
                goods.name = item.name;
                goods.amount = 1;
                goods.unit = item.unit;
                promotionGoods.push(goods);
                break;
            }
        }
    }

    return [promotionGoods, promotionPrices, buyLists]
}
function printInventory(inputs) {
    let result = "";
    let buyBarcodes = inputs;
    let allItems = database.loadAllItems();
    let all_promotions = database.loadPromotions();
    let total_prices = initShopInventory(buyBarcodes, allItems)[0];
    let buy_lists = initShopInventory(buyBarcodes, allItems)[1];
    let afterPromotions = matchPromotion(all_promotions, buy_lists);
    var promotion_goods = afterPromotions[0];
    var promotion_prices = afterPromotions[1];
    buy_lists = afterPromotions[2];
    total_prices = total_prices - promotion_prices;
    /*print inventory */
    let title = '***<没钱赚商店>购物清单***\n';
    let segment_line = "----------------------\n";
    let bottom_line = "**********************";
    let promotion_title = "挥泪赠送商品：\n";
    let inventory = "";
    inventory += title;
    for (var goods of buy_lists) {
        inventory += `名称：${goods.name}，数量：${goods.amount}${goods.unit}，单价：${goods.price.toFixed(2)}(元)，小计：${goods.subtotal.toFixed(2)}(元)\n`;
    }
    inventory += segment_line;
    inventory += promotion_title;
    for (var promotionsItem of promotion_goods) {
        inventory += `名称：${promotionsItem.name}，数量：${promotionsItem.amount}${promotionsItem.unit}\n`;
    }
    inventory += segment_line;
    inventory += `总计：${total_prices.toFixed(2)}(元)\n节省：${promotion_prices.toFixed(2)}(元)\n`;
    inventory += bottom_line;
    console.log(inventory);
}
// module.exports = printInventory;