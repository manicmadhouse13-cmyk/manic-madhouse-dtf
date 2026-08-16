/*==================================================
MANIC MADHOUSE DTF DESIGNS
SCRIPT.JS
CLEAN PRODUCTION VERSION
==================================================*/


document.addEventListener(
"DOMContentLoaded",
function(){


console.log("MAIN SCRIPT LOADED");



/*==================================================
NAVIGATION
==================================================*/


function initialiseNavigation(){


const currentPage =
window.location.pathname.split("/").pop();



document
.querySelectorAll("nav a")
.forEach(link=>{


const href =
link.getAttribute("href");


if(href === currentPage){

link.classList.add("active");

}


});


}



/*==================================================
SHOP SEARCH
==================================================*/


function initialiseShop(){


const searchInput =
document.getElementById("searchInput");


if(!searchInput){

return;

}



searchInput.addEventListener(
"input",
function(){


const value =
this.value.toLowerCase();



document
.querySelectorAll(
".product-card, .collection-card"
)
.forEach(card=>{


const text =
card.innerText.toLowerCase();



card.style.display =
text.includes(value)
?
"block"
:
"none";


});


});


}



/*==================================================
QUOTE PAGE
==================================================*/


function initialiseQuote(){


const quoteSummary =
document.getElementById(
"quoteSummary"
);


if(!quoteSummary){

return;

}


console.log(
"QUOTE PAGE READY"
);


}



/*==================================================
DESIGN BUILDER HELPERS
==================================================*/


function initialiseDesignBuilder(){



const designPreview =
document.getElementById(
"designPreview"
);



const upload =
document.getElementById(
"uploadImage"
);



if(!designPreview || !upload){

return;

}



upload.addEventListener(
"change",
function(){


const file =
this.files[0];


if(!file){

return;

}



if(!file.type.startsWith("image/")){


alert(
"Please upload an image file."
);


return;


}



const reader =
new FileReader();



reader.onload =
function(e){


designPreview.src =
e.target.result;


designPreview.style.display =
"block";


};



reader.readAsDataURL(file);



});


}



/*==================================================
ANIMATIONS
==================================================*/


function initialiseAnimations(){


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}


});


},
{
threshold:0.2
}
);



document
.querySelectorAll(
".product-card, .collection-card, .why-card, .review-card, .process-card, .faq-item"
)
.forEach(item=>{


observer.observe(item);


});


}



/*==================================================
BACK TO TOP
==================================================*/


function initialiseTopButton(){


const topBtn =
document.getElementById(
"topBtn"
);



if(!topBtn){

return;

}



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 300){

topBtn.style.display =
"flex";

}
else{

topBtn.style.display =
"none";

}


});



topBtn.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}



/*==================================================
START SYSTEMS
==================================================*/


initialiseNavigation();

initialiseShop();

initialiseQuote();

initialiseDesignBuilder();

initialiseAnimations();

initialiseTopButton();



});
