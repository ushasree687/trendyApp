let prdArray = [];
let totalItemCount = 0;

var getProductId = (productId) =>{ 
  // alert(productId);  
  addItemtocart(productId);
}


var addItemtocart = (productId) => {
  // alert(loggedInUser);
  totalItemCount++;
  $("#cartCount").html(totalItemCount)
  $.ajax({
    url: '/add/item/toCart',
    data: {
      productId: productId,
      count: 2,
      accountId: loggedInUser
    },
    dataType: 'JSON',
    method: 'POST',
    success: (response) => {
      console.log(response);
    }
  })
  
}

let checkData =(id)=>{
  if(prdArray.length==0)
  {
    console.log(3)
   prdArray.push({"ProductId":id, itemCounts:1});
  }
  else
  {
    prdArray.find((obj)=>{
      if(obj.ProductId == id)
      {
        console.log(1)
        obj.itemCounts = obj.itemCounts + 1;
      }
      else{
        console.log(2)
        prdArray.push({"ProductId":id, itemCounts:1});
      }
      })
   }
   console.log(prdArray);
}
    
    

