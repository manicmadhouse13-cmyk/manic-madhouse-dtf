/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT
FINAL CLEAN VERSION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("QUOTE SUBMIT LOADED");


    const quoteForm = document.getElementById("quoteForm");


    if (!quoteForm) {

        console.log("QUOTE FORM NOT FOUND");

        return;

    }


    console.log("QUOTE FORM CONNECTED");



    quoteForm.addEventListener("submit", async (event) => {


        event.preventDefault();


        console.log("QUOTE SUBMITTED");



        try {


            if (!window.supabaseClient) {

                throw new Error(
                    "Supabase client missing"
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



            console.log(
                "CUSTOMER DATA:",
                customerData
            );



            const {
                data: customer,
                error: customerError

            } = await window.supabaseClient

                .from("customers")

                .insert([customerData])

                .select()

                .single();



            if (customerError) {

                throw customerError;

            }



            console.log(
                "CUSTOMER CREATED:",
                customer
            );



            const quoteData = {


                customer_id:
                customer.customer_id,


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



            console.log(
                "QUOTE DATA:",
                quoteData
            );



            const {
                data: quote,
                error: quoteError

            } = await window.supabaseClient

                .from("quotes")

                .insert([quoteData])

                .select()

                .single();



            if (quoteError) {

                throw quoteError;

            }



            console.log(
                "QUOTE CREATED:",
                quote
            );



            localStorage.removeItem(
                "manicQuoteBasket"
            );



            alert(
                "Your quote request has been submitted successfully!"
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
