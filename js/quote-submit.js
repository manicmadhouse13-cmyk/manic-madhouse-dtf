alert("QUOTE SUBMIT LOADED");
/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
FINAL PRODUCTION VERSION
==================================================*/


document.addEventListener("DOMContentLoaded", function () {


    console.log("QUOTE SUBMIT LOADED");


    const form = document.getElementById("quoteForm");
alert("FORM FOUND: " + (form !== null));

    if (!form) {

        console.log("QUOTE FORM NOT FOUND");

        return;

    }



    form.addEventListener("submit", async function (event) {
alert("FORM FOUND: " + (form !== null));

        event.preventDefault();


        try {


            console.log("STARTING QUOTE");



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



            /*
            SAVE CUSTOMER
            */


            const {
                data: customer,
                error: customerError

            } = await window.db

                .from("customers")

                .insert(customerData)

                .select()

                .single();



            if (customerError)
                throw customerError;



            console.log("CUSTOMER SAVED");




            /*
            SAVE QUOTE
            */


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
                    document.getElementById("notes").value,


                status:
                    "New"


            };



            const {
                data: quote,
                error: quoteError

            } = await window.db

                .from("quotes")

                .insert(quoteData)

                .select()

                .single();



            if (quoteError)
                throw quoteError;



            console.log("QUOTE SAVED");




            /*
            SAVE DESIGNS
            */


            await saveDesigns(quote.id);




            /*
            SEND EMAIL
            */


            await sendNotification(quote);




            /*
            CLEAR BASKET
            */


            localStorage.removeItem(
                "manicQuoteBasket"
            );



            alert(
                "Quote submitted successfully"
            );



            window.location.href =
                "thankyou.html";



        }


        catch(error) {


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







async function saveDesigns(quoteId) {


    const basket =
        JSON.parse(
            localStorage.getItem(
                "manicQuoteBasket"
            )
        ) || [];



    if (!basket.length) {


        console.log(
            "NO DESIGNS"
        );


        return;


    }




    for (const item of basket) {



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

        } = await window.db

            .from("designs")

            .insert(designData);



        if (error)
            throw error;


    }



    console.log(
        "DESIGNS SAVED"
    );


}








async function sendNotification(quote) {



    const response = await fetch(

        "https://YOUR_NEW_FUNCTION_URL",

        {


            method:
                "POST",


            headers: {


                "Content-Type":
                    "application/json"


            },


            body:
                JSON.stringify({


                    quoteNumber:
                        quote.quote_number,


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


        throw new Error(
            "Email failed"
        );


    }


}
