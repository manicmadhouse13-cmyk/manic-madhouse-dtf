// =====================================
// MANIC MADHOUSE DTF DESIGNS
// APP.JS
// =====================================

// Loading Screen
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    },1200);

});

// Sticky Navigation

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>60){

navbar.style.padding="10px 0";

navbar.style.background="rgba(8,8,12,.95)";

}else{

navbar.style.padding="18px 0";

navbar.style.background="rgba(8,8,12,.65)";

}

});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// Reveal Animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});

// Floating Glow Animation

let glow=document.createElement("div");

glow.className="cursorGlow";

document.body.appendChild(glow);

document.addEventListener("mousemove",e=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

// Counter Animation

document.querySelectorAll(".counter").forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.dataset.target;

const c=+counter.innerText;

const increment=target/100;

if(c<target){

counter.innerText=Math.ceil(c+increment);

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

});
const products=[

{
id:1,
name:"Chaos But Make It Cute",
price:15,
category:"Funny",
image:"images/products/design1.png"
},

{
id:2,
name:"Hot Mess Express",
price:15,
category:"Funny",
image:"images/products/design2.png"
},

{
id:3,
name:"Overstimulated Moms Club",
price:15,
category:"Mums",
image:"images/products/design3.png"
},

{
id:4,
name:"IDGAF",
price:15,
category:"Funny",
image:"images/products/design4.png"
},

{
id:5,
name:"Built Different",
price:15,
category:"JDM",
image:"images/products/design6.png"
},

{
id:6,
name:"JDM Legend",
price:15,
category:"JDM",
image:"images/products/design7.png"
},

{
id:7,
name:"Stay Wild",
price:15,
category:"Country",
image:"images/products/design21.png"
},

{
id:8,
name:"Lucky 13",
price:15,
category:"Tattoo",
image:"images/products/design22.png"
},

{
id:9,
name:"Keep Trippin'",
price:15,
category:"Tattoo",
image:"images/products/design23.png"
},

{
id:10,
name:"Unlucky 13",
price:15,
category:"Tattoo",
image:"images/products/design24.png"
}

];
let filteredProducts=[...products];

const grid=document.getElementById("productGrid");

function displayProducts(items){

grid.innerHTML="";

items.forEach(product=>{

grid.innerHTML+=`

<div class="col-lg-3 col-md-6 mb-4">

<div class="product-card">

<div class="product-image">

<img src="${product.image}">

</div>

<div class="product-info">

<h4>${product.name}</h4>

<p>$${product.price}</p>

<a href="product.html?id=${product.id}"

class="btn btn-primary">

View Product

</a>

</div>

</div>

</div>

`;

});

}

displayProducts(products);

document.getElementById("search").addEventListener("keyup",filterProducts);

document.getElementById("category").addEventListener("change",filterProducts);

document.getElementById("sort").addEventListener("change",filterProducts);

function filterProducts(){

const search=document.getElementById("search").value.toLowerCase();

const category=document.getElementById("category").value;

const sort=document.getElementById("sort").value;

filteredProducts=products.filter(product=>{

const matchesSearch=product.name.toLowerCase().includes(search);

const matchesCategory=category==="All"||product.category===category;

return matchesSearch&&matchesCategory;

});

if(sort==="low"){

filteredProducts.sort((a,b)=>a.price-b.price);

}

if(sort==="high"){

filteredProducts.sort((a,b)=>b.price-a.price);

}

displayProducts(filteredProducts);

}
// Update Cart Counter

function updateCartCount(){

const cart=JSON.parse(localStorage.getItem("cart"))||[];

let total=0;

cart.forEach(item=>{

total+=item.qty;

});

const badge=document.getElementById("cart-count");

if(badge){

badge.innerText=total;

}

}

updateCartCount();
