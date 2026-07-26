/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
VERSION 1.0
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) {
        return;
    }


    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        alert("QUOTE SUBMIT STARTED");


        try {


            const customerData = {

                full_name:
                    document.getElementById("fullName").value,

                business_name:
                    document.getElementById("businessName").value,

                email:
                    document.getElementById("email").value,

                phone:
                    document.getElementById("phone").value

            };


            const {
                data: customer,
                error: customerError

            } = await window.db
                .from("customers")
                .insert(customerData)
                .select()
                .single();


            if (customerError) {
                throw customerError;
            }


            alert("CUSTOMER SAVED");


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


            if (quoteError) {
                throw quoteError;
            }


            alert("QUOTE SAVED");


            alert(
                "Your quote number is: " + quote.id
            );

            await saveDesigns(quote.id);

alert("DESIGNS SAVED");


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

async function saveDesigns(quoteId) {

    const quoteItems =
        JSON.parse(
            localStorage.getItem("manicQuoteBasket")
        ) || [];


    if (quoteItems.length === 0) {

        alert("NO DESIGNS FOUND");

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


        const {
            error
        } = await window.db
            .from("designs")
            .insert(designData);


        if (error) {

            throw error;

        }

    }

}
});
