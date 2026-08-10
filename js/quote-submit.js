/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
CLEAN PRODUCTION VERSION
==================================================*/


document.addEventListener(
"DOMContentLoaded",
function(){


const form =
document.getElementById("quoteForm");


if(!form){

console.log(
"QUOTE FORM NOT FOUND"
);

return;

}



form.addEventListener(
"submit",
async function(event){


event.preventDefault();



try{


if(!window.db){

throw new Error(
"Supabase connection missing"
);

}



const customerData = {


full_name:
document.getElementById("fullName").value.trim(),


business_name:
document.getElementById("businessName").value.trim(),


email:
document.getElementById("email").value.trim(),


phone:
document.getElementById("phone").value.trim()


};




const {
data: customer,
error: customerError

} = await window.db

.from("customers")

.insert(customerData)

.select()

.single();



if(customerError){

throw customerError;

}





const quoteData = {


customer_id:
customer.id,


service:
document.getElementById("service").value,


required_date:
document.getElementById("requiredDate").value || null,


delivery:
"Website",


notes:
document.getElementById("notes").value


};





const {
data: quote,
error: quoteError

} = await window.db

.from("quotes")

.insert(quoteData)

.select()

.single();




if(quoteError){

throw quoteError;

}





await saveDesigns(
quote.id
);





await sendQuoteNotification(
quote
);





localStorage.removeItem(
"manicQuoteBasket"
);





alert(
"Quote submitted successfully"
);





window.location.href =
"thankyou.html";



}


catch(error){


console.error(
"QUOTE ERROR:",
error
);


alert(
error.message
);


}



});



});





async function saveDesigns(
quoteId
){



const items =
JSON.parse(
localStorage.getItem("manicQuoteBasket")
) || [];



if(items.length===0){

return;

}




for(const item of items){



const designData = {


quote_id:
quoteId,


image_url:
item.image || "",


shirt_colour:
item.colour || "",


shirt_size:
item.shirtSize || "",


print_location:
item.location || "",


design_size:
Number(item.size) || 0,


rotation:
Number(item.rotation) || 0,


quantity:
Number(item.quantity) || 1,


notes:
item.notes || ""

};




const {
error
} =
await window.db

.from("designs")

.insert(designData);



if(error){

throw error;

}



}



}





async function sendQuoteNotification(
quote
){



const response =
await fetch(

"https://ymkmpsgossabyznwhluk.supabase.co/functions/v1/new-quote-notification",

{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


quoteNumber:
quote.id,


customerName:
document.getElementById("fullName").value,


businessName:
document.getElementById("businessName").value,


email:
document.getElementById("email").value,


phone:
document.getElementById("phone").value,


service:
document.getElementById("service").value,


quantity:
document.getElementById("quantity")?.value || "",


requiredDate:
document.getElementById("requiredDate").value,


printLocation:
document.getElementById("printLocation")?.value || "",


garmentColour:
document.getElementById("garmentColour")?.value || "",


sizes:
document.getElementById("sizes")?.value || "",


projectDescription:
document.getElementById("projectDescription")?.value || "",


notes:
document.getElementById("notes").value


})


}

);



if(!response.ok){


const text =
await response.text();


throw new Error(text);


}



}
