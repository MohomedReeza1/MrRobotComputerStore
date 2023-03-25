
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
	    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }



function purchaseClicked() {

  var x = document.forms["myForm"]["name"].value;
  
  if (x == "" || x == null) {
    alert("Please Fill All The Details.");
    return false;
  
}
  var y = document.forms["myForm"]["num"].value;
  if (y == "" || y == null) {
    alert("Please Fill All The Details.");
    return false;
  
}
  var z = document.forms["myForm"]["email"].value;
  
  if (z == "" || z == null) {
    alert("Please Fill All The Details.");
    return false;
  
}
  var a = document.forms["myForm"]["address"].value;
  
  if (a == "" || a == null) {
    alert("Please Fill All The Details.");
    return false;
  
}
//   var y = document.forms["myForm"]["payment"].value;
//   if (y == "" || y == null) {
//     alert("Please Fill All The Details.");
//     return false;
  
// }
  var cartItems = document.getElementsByClassName('cart-items')[0].innerText
  if (cartItems == "" || cartItems == null) {
    alert("Your Cart Is Empty");
    return false;
  
}

   
   
	
    openInvoicePage()
	clearDetails()

}

function clearDetails(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }

    document.forms["myForm"]["name"].value = '';
    document.forms["myForm"]["num"].value = '';
    document.forms["myForm"]["email"].value = '';
    document.forms["myForm"]["address"].value = '';
    updateCartTotal()
}

function openInvoicePage() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let itemArr = [];
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var description = cartRow.getElementsByClassName('cart-item')[0].childNodes[3].innerText
        var unitPrice = cartRow.getElementsByClassName('cart-price')[0].innerText
        var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value
        var price = parseFloat(unitPrice.replace('Rs ', ''))
        var itemTotal = (price * quantity)
        itemArr.push({description,unitPrice,quantity,itemTotal: 'Rs ' + itemTotal});
    }
    let total = document.getElementsByClassName('cart-total-price')[0].innerText;
    let userName = document.forms["myForm"]["name"].value;
    let phoneNumber = document.forms["myForm"]["num"].value;
    let email = document.forms["myForm"]["email"].value;
    let address = document.forms["myForm"]["address"].value;
    let invoiceObj = {
        userName,
        phoneNumber,
        email,
        address,
        total,
        items:itemArr
    }

    localStorage.setItem('invoiceObj', JSON.stringify(invoiceObj));
    window.open('invoice.html');

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if ( input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This Item Is Already Added To The Cart');
			
			return
			
			 }
			 
            
        }

    
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs ' + total
}