// ===============================
// DESIGN STUDIO
// ===============================

const uploadImage = document.getElementById("uploadImage");
const designPreview = document.getElementById("designPreview");
const shirtImage = document.getElementById("shirtImage");

const sizeSlider = document.getElementById("sizeSlider");
const rotateSlider = document.getElementById("rotateSlider");
const shirtColour = document.getElementById("shirtColour");

// Upload artwork
if(uploadImage){

uploadImage.addEventListener("change", function(e){

const reader = new FileReader();

reader.onload = function(){

designPreview.src = reader.result;
designPreview.style.display = "block";

}

reader.readAsDataURL(e.target.files[0]);

});

}

// Resize
if(sizeSlider){

sizeSlider.addEventListener("input", function(){

designPreview.style.width = this.value + "px";

});

}

// Rotate
if(rotateSlider){

rotateSlider.addEventListener("input", function(){

designPreview.style.transform =
`translate(-50%,-50%) rotate(${this.value}deg)`;

});

}

// Shirt colours
if(shirtColour){

shirtColour.addEventListener("change", function(){

shirtImage.src = "shirt-" + this.value + ".png";

});

}
let dragging = false;

let offsetX = 0;

let offsetY = 0;

designPreview.addEventListener("mousedown", function(e){

dragging = true;

offsetX = e.offsetX;

offsetY = e.offsetY;

});

document.addEventListener("mouseup", function(){

dragging = false;

});

document.addEventListener("mousemove", function(e){

if(!dragging) return;

const rect = shirtImage.getBoundingClientRect();

designPreview.style.left =
(e.clientX - rect.left - offsetX) + "px";

designPreview.style.top =
(e.clientY - rect.top - offsetY) + "px";

});
// =====================================
// QUOTE BASKET
// =====================================

const quoteButtons = document.querySelectorAll(".quote-btn");
const quoteList = document.getElementById("quoteList");

let quotes = [];

quoteButtons.forEach(button => {

button.addEventListener("click", () => {

const design = button.dataset.name;

quotes.push(design);

displayQuotes();

});

});

function displayQuotes(){

if(!quoteList) return;

quoteList.innerHTML="";

quotes.forEach(item=>{

const p=document.createElement("p");

p.innerText="✔ " + item;

quoteList.appendChild(p);

});

}
