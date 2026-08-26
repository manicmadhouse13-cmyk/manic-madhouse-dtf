/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
FINAL VERSION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

console.log("QUOTE SUBMIT LOADED");


const quoteForm = document.getElementById("quoteForm");


if(!quoteForm){
    console.error("quoteForm missing");
    return;
}


console.log("quoteForm CONNECTED");



quoteForm.addEventListener("submit", async (e)=>{

e.preventDefault();


console.log("QUOTE FORM SUBMITTED");



const customer = {

full_name:
document.getElementById("fullName")?.value || "",

business_name:
document.getElementById("businessName")?.value || "",

email:
document.getElementById("email")?.value || "",

phone:
document.getElementById("phone")?.value || ""

};



const quote = {


service:
document.getElementById("service")?.value || "",


required_date:
document.getElementById("requiredDate")?.value || null,


delivery:
document.getElementById("printLocation")?.value || "",


notes:
document.getElementById("notes")?.value || "",


contact_method:
document.getElementById("contactMethod")?.value || "",


quantity:
document.getElementById("quantity")?.value || "",


print_location:
document.getElementById("printLocation")?.value || "",


garment_colour:
document.getElementById("garmentColour")?.value || "",


sizes:
document.getElementById("sizes")?.value || "",


project_description:
document.getElementById("projectDescription")?.value || "",


design_summary:
document.getElementById("designSummary")?.value || "",


artwork:
document.getElementById("artwork")?.files[0]?.name || "",


designs:
JSON.parse(localStorage.getItem("quoteBasket")) || [],


status:
"New"


};



console.log("CUSTOMER:", customer);
console.log("QUOTE:", quote);



try{


// SAVE CUSTOMER FIRST

const {data:customerData,error:customerError}=

await supabase
.from("customers")
.insert([customer])
.select()
.single();



if(customerError){

console.error(customerError);
alert(customerError.message);
return;

}



console.log("CUSTOMER SAVED", customerData);



// LINK QUOTE TO CUSTOMER

quote.customer_id = customerData.customer_id;


quote.quote_number =
"MM-" + Date.now();



const {data:quoteData,error:quoteError}=

await supabase
.from("quotes")
.insert([quote])
.select();



if(quoteError){

console.error(quoteError);
alert(quoteError.message);
return;

}



console.log("QUOTE SAVED",quoteData);



alert(
"Thank you! Your quote request has been submitted."
);



localStorage.removeItem("quoteBasket");

quoteForm.reset();



}

catch(err){

console.error(err);

alert(
"Something went wrong. Please try again."
);


}



});


});
