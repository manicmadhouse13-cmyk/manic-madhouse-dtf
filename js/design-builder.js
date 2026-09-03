/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
FINAL CLEAN VERSION
==================================================*/

document.addEventListener("DOMContentLoaded", function () {


/*==================================================
ELEMENTS
==================================================*/

const uploadImage = document.getElementById("uploadImage");
const designPreview = document.getElementById("designPreview");

const shirtImage =
    document.getElementById("shirt") ||
    document.getElementById("shirtImage");

const shirtColour = document.getElementById("shirtColour");

const sizeSlider = document.getElementById("sizeSlider");
const rotateSlider = document.getElementById("rotateSlider");

const shirtSize = document.getElementById("shirtSize");
const printLocation = document.getElementById("printLocation");
const quantity = document.getElementById("quantity");
const designNotes = document.getElementById("designNotes");

const addQuote = document.getElementById("addQuote");
const quoteBasket = document.getElementById("quoteBasket");


/*==================================================
STOP IF BUILDER NOT FOUND
==================================================*/

if (!designPreview) {
    return;
}


/*==================================================
DESIGN DATA
==================================================*/

const design = {

    image: null,

    x: 50,

    y: 42,

    size: sizeSlider
        ? Number(sizeSlider.value)
        : 80,

    rotation: rotateSlider
        ? Number(rotateSlider.value)
        : 0

};



let dragging = false;



/*==================================================
UPDATE PREVIEW
==================================================*/

function updatePreview() {


    if (!design.image) {

        designPreview.style.display = "none";

        return;

    }


    designPreview.style.display = "block";


    designPreview.src = design.image;


    designPreview.style.position = "absolute";


    designPreview.style.left =
        design.x + "%";


    designPreview.style.top =
        design.y + "%";


    designPreview.style.width =
        design.size + "px";


    designPreview.style.height =
        "auto";


    designPreview.style.transform =
        `translate(-50%, -50%) rotate(${design.rotation}deg)`;


}



/*==================================================
UPLOAD ARTWORK
==================================================*/

if (uploadImage) {


uploadImage.addEventListener(
"change",
function(event){


const file =
event.target.files[0];


if(!file){

return;

}


if(!file.type.startsWith("image/")){

alert("Please upload an image.");

return;

}



const reader =
new FileReader();



reader.onload =
function(e){


design.image =
e.target.result;


updatePreview();


};



reader.readAsDataURL(file);



});

}



/*==================================================
SIZE SLIDER
==================================================*/

if(sizeSlider){


sizeSlider.addEventListener(
"input",
function(){


design.size =
Number(this.value);


updatePreview();


});


}



/*==================================================
ROTATION SLIDER
==================================================*/

if(rotateSlider){


rotateSlider.addEventListener(
"input",
function(){


design.rotation =
Number(this.value);


updatePreview();


});


}
    /*==================================================
SHIRT COLOUR
==================================================*/

if (shirtColour && shirtImage) {


shirtColour.addEventListener(
"change",
function(){


const shirts = {

black: "shirt-black.png",
white: "shirt-white.png",
grey: "shirt-grey.png",
navy: "shirt-navy.png",
red: "shirt-red.png"

};


if(shirts[this.value]){

shirtImage.src =
shirts[this.value];

}


});


}



/*==================================================
DRAG + TOUCH
==================================================*/

function getPosition(event){


if(event.touches && event.touches.length){

return {

x:event.touches[0].clientX,

y:event.touches[0].clientY

};

}


return {

x:event.clientX,

y:event.clientY

};


}



function startDrag(event){


if(!design.image){

return;

}


dragging = true;


event.preventDefault();


}



function moveDrag(event){


if(!dragging){

return;

}


const container =
designPreview.parentElement;


if(!container){

return;

}


const rect =
container.getBoundingClientRect();


const pointer =
getPosition(event);



design.x =
((pointer.x - rect.left) / rect.width) * 100;


design.y =
((pointer.y - rect.top) / rect.height) * 100;



design.x =
Math.max(5, Math.min(95, design.x));


design.y =
Math.max(5, Math.min(95, design.y));


updatePreview();


event.preventDefault();


}



function stopDrag(){

dragging = false;

}



designPreview.addEventListener(
"mousedown",
startDrag
);


document.addEventListener(
"mousemove",
moveDrag
);


document.addEventListener(
"mouseup",
stopDrag
);



designPreview.addEventListener(
"touchstart",
startDrag,
{passive:false}
);


document.addEventListener(
"touchmove",
moveDrag,
{passive:false}
);


document.addEventListener(
"touchend",
stopDrag
);




/*==================================================
ADD TO QUOTE
==================================================*/

if(addQuote){


addQuote.addEventListener(
"click",
function(){



if(!design.image){

alert("Please upload a design first.");

return;

}



let quoteItems = [];



try{


quoteItems =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];


}catch(error){


quoteItems = [];


}




const item = {


id:Date.now(),


image:design.image,


colour:
shirtColour
? shirtColour.value
:"black",


shirtSize:
shirtSize
? shirtSize.value
:"",


location:
printLocation
? printLocation.value
:"",


quantity:
quantity
? quantity.value
:"1",


designSize:
design.size,


rotation:
design.rotation,


notes:
designNotes
? designNotes.value
:""


};



quoteItems.push(item);



localStorage.setItem(
"manicQuoteBasket",
JSON.stringify(quoteItems)
);



alert("Design added to quote!");



renderBasket();



});


}



/*==================================================
QUOTE BASKET DISPLAY
==================================================*/

function renderBasket(){


if(!quoteBasket){

return;

}



let items = [];


try{


items =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];


}catch(error){

items=[];

}



if(items.length === 0){


quoteBasket.innerHTML =
"<p>No designs added yet.</p>";


return;


}



quoteBasket.innerHTML = "";



items.forEach(
(item,index)=>{


quoteBasket.innerHTML += `

<div class="basket-item">

<img src="${item.image}" width="100">

<p>
Design ${index + 1}
</p>

<p>
Quantity: ${item.quantity}
</p>

<button class="remove-item"
data-id="${item.id}">
Remove
</button>

</div>

`;

});


document
.querySelectorAll(".remove-item")
.forEach(button=>{


button.addEventListener(
"click",
function(){


const id =
Number(this.dataset.id);



let items =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];



items =
items.filter(
item=>item.id !== id
);



localStorage.setItem(
"manicQuoteBasket",
JSON.stringify(items)
);



renderBasket();


});


});


}



/*==================================================
STARTUP
==================================================*/

renderBasket();

updatePreview();


console.log(
"Manic Madhouse Design Builder FINAL loaded"
);



});
