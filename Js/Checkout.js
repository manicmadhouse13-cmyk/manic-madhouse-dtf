const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("summaryItems");

const total = document.getElementById("summaryTotal");

let grandTotal = 0;

cart.forEach(item=>{

grandTotal += item.price * item.qty;

summary.innerHTML += `

<div class="d-flex justify-content-between mb-2">

<span>${item.name} x${item.qty}</span>

<strong>$${item.price * item.qty}</strong>

</div>

`;

});

total.innerText = grandTotal;

document.getElementById("paypalBtn").onclick=()=>{

alert("PayPal integration coming next.");

};

document.getElementById("stripeBtn").onclick=()=>{

alert("Credit Card integration coming next.");

};
