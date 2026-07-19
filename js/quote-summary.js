/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUMMARY
VERSION 2.0
==================================================*/


document.addEventListener(
"DOMContentLoaded",
function(){



const quoteSummary =
document.getElementById(
"quoteSummary"
);


const clearQuotes =
document.getElementById(
"clearQuotes"
);



const designSummary =
document.getElementById(
"designSummary"
);




let quoteItems =
JSON.parse(
localStorage.getItem(
"manicQuoteBasket"
)
) || [];





if(!quoteSummary){

return;

}





function saveQuotes(){


localStorage.setItem(

"manicQuoteBasket",

JSON.stringify(
quoteItems
)

);


}





function buildSummary(){



if(
quoteItems.length === 0
){


quoteSummary.innerHTML =

`
<p>
No designs added yet.
</p>
`;



if(designSummary){

designSummary.value =
"No designs selected.";

}


return;


}





quoteSummary.innerHTML = "";



let emailText = "";





quoteItems.forEach(
function(item,index){



const card =
document.createElement(
"div"
);



card.className =
"quote-summary-item";





card.innerHTML =

`

<img

src="${item.image}"

class="quote-summary-image"

>



<h3>

Design ${index + 1}

</h3>



<p>

<strong>
Colour:
</strong>

${item.colour}

</p>



<p>

<strong>
Shirt Size:
</strong>

${item.shirtSize}

</p>



<p>

<strong>
Print Location:
</strong>

${item.location}

</p>



<p>

<strong>
Quantity:
</strong>

${item.quantity}

</p>



<p>

<strong>
Notes:
</strong>

${item.notes || "None"}

</p>



<button

class="remove-quote"

data-id="${item.id}">

Remove

</button>



<hr>

`;




quoteSummary.appendChild(
card
);





emailText +=

`

Design ${index + 1}

Colour: ${item.colour}

Size: ${item.shirtSize}

Location: ${item.location}

Quantity: ${item.quantity}

Notes: ${item.notes || "None"}


`;





}

);





if(designSummary){

designSummary.value =
emailText;

}





attachRemoveButtons();



}





function attachRemoveButtons(){



const buttons =
document.querySelectorAll(
".remove-quote"
);




buttons.forEach(
function(button){



button.addEventListener(
"click",
function(){



const id =
Number(
this.dataset.id
);



quoteItems =
quoteItems.filter(
function(item){


return item.id !== id;


}

);



saveQuotes();



buildSummary();



}

);



}

);



}






if(clearQuotes){


clearQuotes.addEventListener(
"click",
function(){



quoteItems = [];



saveQuotes();



buildSummary();



}

);


}






buildSummary();





});
