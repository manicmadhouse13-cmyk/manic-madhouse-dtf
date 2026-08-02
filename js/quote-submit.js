alert("QUOTE SUBMIT JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("quoteForm");

    if (!form) {
        console.log("QUOTE FORM NOT FOUND");
        return;
    }


    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        alert("SUBMIT BUTTON PRESSED");


        try {


            const customerData = {

                full_name: document.getElementById("fullName").value,

                business_name: document.getElementById("businessName").value,

                email: document.getElementById("email").value,

                phone: document.getElementById("phone").value

            };


            const {
                data: customer,
                error: customerError

            } = await window.db
                .from("customers")
                .insert(customerData)
                .select()
                .single();



            if (customerError) throw customerError;



            const quoteData = {

                customer_id: customer.id,

                service: document.getElementById("service").value,

                required_date:
                    document.getElementById("requiredDate").value || null,

                delivery: "Website",

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



            if (quoteError) throw quoteError;



            alert(
                "QUOTE SAVED: " + quote.id
            );



            await saveDesigns(quote.id);


            alert("DESIGNS SAVED");



            await sendQuoteNotification(quote);



            alert("EMAIL SENT");



            window.location.href =
                "thankyou.html";



        }


        catch(error) {


            console.error(error);


            alert(
                error.message
            );


        }


    });

});





async function saveDesigns(quoteId) {


    const quoteItems =
        JSON.parse(
            localStorage.getItem("manicQuoteBasket")
        ) || [];



    if (quoteItems.length === 0) {

        return;

    }



    for (const item of quoteItems) {


        const designData = {


            quote_id: quoteId,


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



        const { error } =
            await window.db
            .from("designs")
            .insert(designData);



        if (error) throw error;


    }


}





async function sendQuoteNotification(quote) {


    alert("EMAIL FUNCTION STARTED");



    const response = await fetch(

        "https://ymkmpsgossabyznwhluk.supabase.co/functions/v1/new-quote-notification",

        {

            method: "POST",


            headers: {

                "Content-Type":
                "application/json"

            },


            body: JSON.stringify({

                quoteNumber:
                    quote.id,


                customerName:
                    document.getElementById("fullName").value,


                email:
                    document.getElementById("email").value,


                service:
                    document.getElementById("service").value,


                notes:
                    document.getElementById("notes").value

            })


        }

    );



    if (!response.ok) {


        const errorText =
            await response.text();


        console.error(
            "RESEND ERROR:",
            errorText
        );


        throw new Error(errorText);


    }


}
