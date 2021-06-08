$(document).ready(function(){
  $("#mycartDetailRow").hide();
  var selectedSize;
  var selectedName;
  var selectedPrice;
  var items = new Array();
  $("#btn_add").hover(function(){
    $("#btn_add_link").css("color","#ffffff");
  }, function() {
    $("#btn_add_link").css("color","#222222");
  });

  $(".div_size_options").click(function(){
    selectedSize = ($(this).find("a").first().text());
    selectedName = ($("#itemName").text());
    selectedPrice = ($("#itemPrice").text());
    $("#selected").text(selectedSize);
  })

  $("#btn_add").click(function(){
    if(typeof selectedSize == "undefined" || selectedSize == null || selectedSize == ""){
      alert("Please select a size");
    }else{
      var isfound = new Boolean();
      var totalAmount = 0;
      for (i=0;i<items.length;i++){
          if (items[i].size === selectedSize && items[i].name == selectedName){
              items[i].qty ++;
              isfound = true;
          }

          totalAmount += items[i].qty;
      }

      if(isfound == false) {
        var item = new Object();
        item.name = selectedName;
        item.size = selectedSize;
        item.price = selectedPrice
        item.qty = 1;
        item.image = $("#itemImg").attr("src");
        totalAmount ++

        items[items.length] = item;
      }
      if (totalAmount  > 0) {
        $("#myCart").text(" ( "+ totalAmount  +" )")
      }

    }
  });

  $("#div_my_cart_container").hover(function(){
    
    if (items.length ==0) {
      return;
    }
    var mycartTop = $("#mycartTop");
    var mycartLavel = $("#div_my_cart_container");
    mycartDivTop = mycartTop.offset().top + mycartTop.height()
    mycartLeft = mycartLavel.offset().left - $("#mycartDetailRow").width() + mycartLavel.width()

    $("#mycartDetailRow").css({position: "absolute",'top':mycartDivTop,'left':mycartLeft,'z-index':2}); 
    $("#myCartDetailUL").html("")
    var html = "<li style=\"margin-top:10px;\"><div class=\"row\"><div class=\"col-md-3\" style=\"width:auto\">"
    html +="<img style=\"width: 70px; height: 100px; display: inline-block;\" src=\"@imageSource\">"
    html +="</div><div class=\"col-md-6\" style=\"width:auto\"><label style=\"margin-bottom: 10px;\">@title</label>"
    html +="<br><label style=\"margin-bottom: 20px;\">@qty</label> * <label>@price</label>"
    html +="<br><label>Size:</label><label>S</label></div></div></li>";
    for (i=0;i<items.length;i++){
      replaceHtml = html
      replaceHtml = replaceHtml.replace('@imageSource',items[i].image);
      replaceHtml = replaceHtml.replace('@qty',items[i].qty);
      replaceHtml = replaceHtml.replace('@title',items[i].name);
      replaceHtml = replaceHtml.replace('@price',items[i].price);
      $("#myCartDetailUL").append(replaceHtml);
    }
    $("#mycartDetailRow").show();
  },function() {
    $("#mycartDetailRow").hide();
  });

});