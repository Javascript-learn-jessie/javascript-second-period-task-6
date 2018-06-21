var itemInfo = [];
$(document).ready(function () {
    // var itemInfo=[];
    $(document).on("click", "button", function () {
        let info = { name: "", price: "", num: "", promotion: "" };
        let index = $(this).attr('class')[0];
        info.name = $(`b.item-${index}`).text();
        info.price = $(`b.price-${index}`).text().split(" ")[0];
        info.num = $(`input.item-${index}num`).val();
        info.promotion = $(`b.prom-${index}`).text();
        itemInfo.push(info);
        console.log(itemInfo);
        // console.log(info.name);
        // console.log(info.price);
        // console.log(info.num);
        // console.log(info.promotion);
    });
    // $(document).on("click","input.pay",function(){
    //     window.location.href="../html/shopcar.html";
    //     console.log(itemInfo);
    //     console.log(itemInfo);
    //     console.log(1);
    // });
    $("button.pay").click(function () {
       // window.location.href = "../html/shopcar.html";
        $.post("../html/shopcar.html",itemInfo);
    })

});
function getInfo() {
    return itemInfo;
}


