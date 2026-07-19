document.addEventListener("DOMContentLoaded", function(){


const quoteSummary =
document.getElementById("quoteSummary");


if(!quoteSummary) return;



const quoteItems =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];



if(quoteItems.length === 0){

quoteSummary.innerHTML =
`
<p>
No designs selected yet.
</p>
`;

return;

}



quoteSummary.innerHTML = "";



quoteItems.forEach(function(item,index){



const design =
document.createElement("div");


design.className =
"quote-summary-item";



design.innerHTML =
`

<h4>
Design ${index + 1}
</h4>


<img 
src="${item.image}"
style="max-width:150px;border-radius:10px;"
>


<p>
<strong>Shirt Colour:</strong>
${item.colour}
</p>


<p>
<strong>Size:</strong>
${item.shirtSize}
</p>


<p>
<strong>Print Location:</strong>
${item.location}
</p>


<p>
<strong>Quantity:</strong>
${item.quantity}
</p>


<p>
<strong>Notes:</strong>
${item.notes || "None"}
</p>


<hr>

`;



quoteSummary.appendChild(design);



});


});
