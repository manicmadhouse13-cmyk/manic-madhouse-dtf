/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
VERSION 3.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("QUOTE SUBMIT LOADED");


    const quoteForm = document.getElementById("quoteForm");

    if (!quoteForm) {

        console.error("quoteForm NOT FOUND");

        return;

    }


    console.log("quoteForm CONNECTED");



    quoteForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        console.log("QUOTE FORM SUBMITTED");



        const fullName =
            document.getElementById("fullName")?.value.trim() || "";


        const businessName =
            document.getElementById("businessName")?.value.trim() || "";


        const email =
            document.getElementById("email")?.value.trim() || "";


        const phone =
            document.getElementById("phone")?.value.trim() || "";


        const contactMethod =
            document.getElementById("contactMethod")?.value || "";


        const service =
            document.getElementById("service")?.value || "";


        const quantity =
            document.getElementById("quantity")?.value || "";


        const requiredDate =
            document.getElementById("requiredDate")?.value || "";


        const printLocation =
            document.getElementById("printLocation")?.value || "";


        const garmentColour =
            document.getElementById("garmentColour")?.value || "";


        const sizes =
            document.getElementById("sizes")?.value || "";


        const projectDescription =
            document.getElementById("projectDescription")?.value.trim() || "";


        const notes =
            document.getElementById("notes")?.value.trim() || "";


        const designSummary =
            document.getElementById("designSummary")?.value || "";



        const artworkInput =
            document.getElementById("artwork");


        let artworkFile = null;


        if (artworkInput && artworkInput.files.length) {

            artworkFile = artworkInput.files[0].name;

        }



        const quoteBasket =
            JSON.parse(localStorage.getItem("quoteBasket")) || [];



        const quoteData = {

    customer_id: customer.id,

    quote_number:
        "MM-" + Date.now(),

    service:
        document.getElementById("service").value,

    required_date:
        document.getElementById("requiredDate").value || null,

    delivery:
        "Website",

    notes:
        document.getElementById("notes").value,

    status:
        "New"

};



        console.log("QUOTE DATA:", quoteData);




        try {


            const { data, error } =
    await window.supabaseClient
    .from("quotes")
    .insert([quoteData]);



            if (error) {

    console.error("SUPABASE ERROR:", error);

    alert(error.message);

    return;

            }



            console.log("QUOTE SENT:", data);



            alert(
                "Thank you! Your quote request has been submitted."
            );



            localStorage.removeItem("quoteBasket");



            quoteForm.reset();



        } 
        
        catch (err) {


            console.error(
                "SUBMIT ERROR:",
                err
            );


            alert(
    "TEST ERROR MESSAGE"
);


        }



    });



});
