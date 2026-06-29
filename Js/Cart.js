const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");

const totalDisplay = document.getElementById("cartTotal");

let total = 0;

function drawCart() {

cartItems.innerHTML = "";

total = 0;

if(cart.length===0){

cartItems.innerHTML="<h3>Your cart is empty.</h3>";

totalDisplay.innerText="0";

return;

}

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-card">

<div class="row align-items-center">

<div class="col-md-2">

<img src="${item.image}" class="img-fluid rounded">

</div>

<div class="col-md-4">

<h4>${item.name}</h4>

<p>${item.size}</p>

</div>

<div class="col-md-2">

Qty: ${item.qty}

</div>

<div class="col-md-2">

$${item.price}

</div>

<div class="col-md-2">

<button onclick="removeItem(${index})"

class="btn btn-danger">

Remove

</button>

</div>

</div>

</div>

`;

});

totalDisplay.innerText = total;

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

drawCart();

}

drawCart();
