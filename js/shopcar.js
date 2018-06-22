//var itemInfo = [];
$(document).ready(function () {
    var itemInfo=[];
    
    $(document).on("click", `#add`, function () {
        let info = { name: "", price: "", num: "", promotion: "",unit:"" };
        let index = $(this).attr('class')[0];
        info.name = $(`b.item-${index}`).text();
        info.price = $(`b.price-${index}`).text().split(" ")[0];
        let unit = $(`b.price-${index}`).text().split("");
        info.unit = unit[unit.length-1];
        info.num = $(`input.item-${index}num`).val();
        info.promotion = $(`b.prom-${index}`).text();
        itemInfo.push(info);
    });

    $("button.pay").click(function () {
        let strInfo = JSON.stringify(itemInfo)
       window.location.href = `../html/shopcar.html?items=${strInfo}`;
    })

});


