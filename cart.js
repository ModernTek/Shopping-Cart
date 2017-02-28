var cart = {
  "items": [

  ],
  "cart-total": 0,
  "promos": {
      "LEGO": 0.9,
      "ASICS": 0.85,
      "5ITEM": 0.95
    }
};

var utilities = {
   find: function (list, id) {
      var i = 0;
      var found = false;

      while (!found && i < list.length) {
         if (list[i].id === id) {
            found = true;
         }
         i++;
      }

      if (found) {
         return i - 1;
      } else {
         return -1;
      }

   },
  findByProductName: function (list, name) {
      var i = 0;
      var found = false;
      while (!found && i < list.length) {      
         if (list[i].name === name) {
            found = true;         
         }
         i++; 
      }
      if (found) {
         return i - 1;
      }
      else {
         return null;
      }
   },
   cartTotalItems: function (list) {
      var i = 0;
      var num = 0;

      while (i < list.length) {
         num += list[i].count;
         i++;
      }
      return num;
   },
};

// Toggle show/hide cart w/ button

var checkout = document.getElementById("checkout");
var toggleButton = document.getElementById("toggle");
function showHide(el) {
 
  if(el.classList.contains('hide')) {
    toggleButton.textContent = "Hide Shopping Cart";
  } else {
    toggleButton.textContent = "Show Shopping Cart";
  }
  el.classList.toggle('hide');
  el.focus();
}

toggleButton.addEventListener('click', function() {
  showHide(checkout);
}, false);

// Global variables
var subTotal = document.getElementById("subtotal");

function addItem(id) {
  
  // Look up product details
  var product = document.getElementById(id);
   // added itemId
  var itemId = product.getAttribute("id");
   console.log(itemId);
  var productName = product.querySelector(".title").innerHTML;
  var productDescription = product.querySelector(".product-description").innerHTML;
  var shortProductDescription = productDescription.substr(0, productDescription.indexOf("."));
  var productPic = document.querySelector(".prodImg").src;
  
   var indexInCartObject = utilities.find(cart.items, itemId);

  var productPrice = parseFloat(product.querySelector(".st").innerHTML.replace(/[^\d|\.]/g, ""));
  console.log("productPrice = " + productPrice); 

console.log(indexInCartObject);
  // Check if items exists, if so increment count, else add to cart
  var inputFieldId = cart.items.length;
  console.log("cart.items.length = " + cart.items.length);
  if (cart.items.length === 0 || indexInCartObject === -1) {
    cart.items.push({
      "id": itemId,
      "featuredImage": productPic,
      "name": productName,
      "price": productPrice,
      "totalPrice": productPrice,
      "count": 1,
      "inputId": inputFieldId
    });
   } else {
      
        cart.items[indexInCartObject].count += 1;
        cart.items[indexInCartObject].totalPrice += productPrice;
    }
  
 console.log("before render cart on screen " + cart.items.length);
  // Rerender cart on screen
  
  toggleButton.style.display = "block";
  title
  console.log(cart.items);
    // use a function from utilities object to update our cart number on each click
  
  displayInCart();
  calculateSubTotal();
  shoppingCart.focus();
}


function calculateSubTotal(){
  //Set cart-total back to 0 before calculating it
  cart["cart-total"] = 0;
  
  //Loop over all product's prices and quantities and add products
  //of them tothe cart subtotal
  console.log("calculateSubtotal");
  for (var i = 0; i < cart.items.length; i++){
    cart["cart-total"] += cart.items[i].price * cart.items[i].count;
  }
  
  //Set subtotal field to cart-total value
  subTotal.value = "$" + cart["cart-total"];
  if (cart["cart-total"] === 0){
    //hide shopping cart
   // var checkout = document.querySelector(".checkout");
     //checkout.style.display = "none";
     //toggleButton.style.display = "none";
  }
  console.log("subtotal = " + cart["cart-total"]);
}

function displayInCart() {

   var itemsInCart = document.getElementById("checkoutNameUl");

   itemsInCart.innerHTML = "";

   for (var i = 0; i < cart.items.length; i++) {
      if (i >= 1) {

         itemsInCart.innerHTML += "<hr id='line" + i + "'><br>"
      }

      itemsInCart.innerHTML +=
          '<li class="checkoutContentsLi" id="product' + cart.items.length + '">' +
          '<div class="cartInfo imageDiv">' +
          '<img class="imageCart" src="' + cart.items[i].featuredImage + '">' +
          '</div>' +
          '<div class="cartInfo itemDiv">' +
          '<p>' + cart.items[i].name + '</p>' +
          '</div>' +
          '<div class="cartInfo priceDiv">' +
          '<p>' + '$ ' +
          cart.items[i].price +
          '</p>' +
          '</div>' +
          '<div class="cartInfo quantityDiv">' +
          '<button class="button1" onclick="decrementValue(this)" value="-">-</button>' +
          '<input id ="' + cart.items[i].inputId + '" readonly="readonly" class="quantityInput" type="text" min="0" max="10" value="' + cart.items[i].count + '">' +
          '<button class="button2" onclick="incrementValue(this)" value="+">+</button>' +
          '</div>' +
          '<div class="cartInfo priceTotalDiv">' +
          '<p>' +
          '$' + cart.items[i].totalPrice +
          '</p>' +
          '</div>' +
          '<div class="cartInfo removeDiv">' +
          '<button class="removeItem" onclick="remove(this)">Remove</a>' +
          '</div>' +
          '<li>'

   }
}  // 

  // remove object when the button "remove" is pressed for that item
function remove(ele) {

   var product = ele.parentNode.previousSibling.previousSibling.previousSibling;

   var productName = product.previousSibling.firstChild.innerHTML;
   console.log(productName);
   calculateSubTotal(productName);

   var cartObject = utilities.findByProductName(cart.items, productName);

   if (cartObject != null)
     cart.items.splice(cartObject, 1);
     calculateSubTotal();
    // Empty text field promo if all items removed
   if ( cart["cart-total"] === 0)
         document.getElementById("userPromo").value='';
        
     displayInCart();
}

  // lowers the quantity of item by 1
// will remove item from cart when trying to decrement past zero
 function decrementValue(ele) {

   var product = ele.parentNode.previousSibling.previousSibling;

   var productName = product.firstChild.innerHTML;

   var inputTag = ele.nextSibling;

   var inputValue = Number(inputTag.value);

   var cartIndex = utilities.findByProductName(cart.items, productName);


   if (cart.items[cartIndex].name === productName && inputValue > 1) {
      cart.items[cartIndex].count -= 1;
      cart.items[cartIndex].totalPrice -= cart.items[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue -= 1;
      inputTag.setAttribute("value", inputValue);

      calculateSubTotal(); 
      displayInCart();
   }
   else {

      cart.items.splice(cartIndex, 1);
      calculateSubTotal();
      document.getElementById("userPromo").value=''; 
      displayInCart();
   }
}
   
  // increases the items in cart by one using the plus sign in shopping cart
 function incrementValue (ele) {
  console.log("Increment");
   var product = ele.parentNode.previousSibling.previousSibling;
   var productName = product.firstChild.innerHTML;
   var inputTag = ele.previousSibling;
   var inputValue = Number(inputTag.value);
   var cartIndex = utilities.findByProductName(cart.items, productName);
   if (cart.items[cartIndex].name === productName && inputValue > 0) {
     console.log("if incr");
      cart.items[cartIndex].count += 1;
      cart.items[cartIndex].totalPrice += cart.items[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue += 1;
      inputTag.setAttribute("value", inputValue);

      calculateSubTotal();
      var promo =
        document.getElementById("userPromo").value;
        promo.innerHTML ="";    
      displayInCart();
   }

}
// function that updates the total price
function updateTotalPrice() {
   var totalPrice = document.getElementById("checkoutPrice");

   var counterNum = 0;
   var i = 0;
   totalPrice.innerHTML = "";

   while (i < cart.itemsCart.length) {
      counterNum += cart.itemsCart[i].totalPrice;
      i++;
   }
}

function calculatePromo() {
  console.log("calculate promo");
  // Set subtotal back to initial value whenever there's no valid user promo in the input box
  subTotal.value = "$" + cart["cart-total"];
  console.log("Calculate promo start" + subTotal.value);
  // Get promo code 
  var userPromo = document.getElementById("userPromo").value;
  console.log("User promo " + userPromo);
  // Get index of product to check if the product on which an eventual 15MACPRO promo code is applied is valid
  var indexLego = utilities.findByProductName(cart.items, "LEGO City");
  var indexAsics = utilities.findByProductName(cart.items, "ASICS");
   console.log(indexLego + " index " + indexAsics);
  // Loop through valid promo codes in cart object
  for (var promo in cart.promos) {
    console.log("promo in the loop " + promo);
    // if promo entered by user matches a valid promo, update the subtotal (an input field) with the new price
    if (userPromo === promo) {
      console.log("userPromo == promo ");
      // If Mac Pro is in basket and 15MACPRO promo code is used, discount 15% of Mac Pro price from total
      if ((indexLego !== -1 && indexLego != null)  && cart.items[indexLego].name === "LEGO City" && userPromo === "LEGO" ) {
        console.log("Promo lego");
        subTotal.value = "$" + ((cart["cart-total"] - cart.items[indexLego].price + cart.items[indexLego].price) * cart.promos[promo]).toFixed(2);
      } else if ((indexAsics !== -1 && indexAsics != null) && cart.items[indexAsics].name === "ASICS" && userPromo === "ASICS" ) {
        console.log("promo asics");
        subTotal.value = "$" + ((cart["cart-total"] - cart.items[indexAsics].price + cart.items[indexAsics].price) * cart.promos[promo]).toFixed(2);
      } else if (userPromo === "5ITEM"){
        subTotal.value = "$" + (cart["cart-total"] * cart.promos[promo]).toFixed(2);
        console.log("calculate promo " + subTotal.value);
      }
    }
  }
}




