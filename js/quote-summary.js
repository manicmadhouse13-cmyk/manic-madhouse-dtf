/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUMMARY
CLEAN VERSION
==================================================*/


document.addEventListener(
"DOMContentLoaded",
function(){


const quoteSummary =
document.getElementById("quoteSummary");


const clearQuotes =
document.getElementById("clearQuotes");


const designSummary =
document.getElementById("designSummary");


if(!quoteSummary){
    return;
}



let quoteItems =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];



function save(){

localStorage.setItem(
"manicQuoteBasket",
JSON.stringify(quoteItems)
);

}



function render(){


quoteSummary.innerHTML="";


if(quoteItems.length===0){


quoteSummary.innerHTML=
"<p>No designs added yet.</p>";


if(designSummary){
designSummary.value="";
}


return;

}



let emailText="";


quoteItems.forEach(
(item,index)=>{


quoteSummary.innerHTML += `

<div class="quote-summary-item">

<img src="${item.image || ""}"
class="quote-summary-image">


<h3>
Design ${index+1}
</h3>


<p>
Colour: ${item.colour || ""}
</p>


<p>
Size: ${item.shirtSize || ""}
</p>


<p>
Location: ${item.location || ""}
</p>


<p>
Quantity: ${item.quantity || 1}
</p>


<button
class="remove-quote"
data-id="${item.id}">
Remove
</button>


</div>

`;



emailText += `

Design ${index+1}
Colour: ${item.colour}
Size: ${item.shirtSize}
Location: ${item.location}
Quantity: ${item.quantity}

`;



});



if(designSummary){

designSummary.value =
emailText;

}



document
.querySelectorAll(".remove-quote")
.forEach(button=>{


button.onclick=function(){


const id =
Number(this.dataset.id);


quoteItems =
quoteItems.filter(
item=>item.id !== id
);


save();

render();


};


});


}



if(clearQuotes){


clearQuotes.onclick=function(){


quoteItems=[];

save();

render();


};


}



render();


});
