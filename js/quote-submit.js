/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT SYSTEM
VERSION 1.0
==================================================*/

document.addEventListener("DOMContentLoaded", function () {


    const quoteForm = document.getElementById("quoteForm");


    if (!quoteForm) {
        console.log("Quote form not found");
        return;
    }


    console.log("Quote submit system loaded");



    quoteForm.addEventListener("submit", async function (e) {

        e.preventDefault();



        const submitButton =
            quoteForm.querySelector(
                'button[type="submit"]'
            );


        submitButton.disabled = true;

        submitButton.innerText =
            "Sending Quote...";



        try {


            /*
            GET DESIGN BASKET
            */

            let designs = [];

            try {

                designs =
                    JSON.parse(
                        localStorage.getItem(
                            "manicQuoteBasket"
                        )
                    ) || [];

            } catch {

                designs = [];

            }



            /*
            BUILD FORM DATA
            */


            const formData = {


                full_name:
                    document.getElementById(
                        "fullName"
                    ).value,


                business_name:
                    document.getElementById(
                        "businessName"
                    ).value,


                email:
                    document.getElementById(
                        "email"
                    ).value,


                phone:
                    document.getElementById(
                        "phone"
                    ).value,


                contact_method:
                    document.getElementById(
                        "contactMethod"
                    ).value,


                service:
                    document.getElementById(
                        "service"
                    ).value,


                quantity:
                    document.getElementById(
                        "quantity"
                    ).value,


                required_date:
                    document.getElementById(
                        "requiredDate"
                    ).value || null,


                delivery:
                    "Australia Wide Shipping",



                print_location:
                    document.getElementById(
                        "printLocation"
                    ).value,


                garment_colour:
                    document.getElementById(
                        "garmentColour"
                    ).value,


                sizes:
                    document.getElementById(
                        "sizes"
                    ).value,


                project_description:
                    document.getElementById(
                        "projectDescription"
                    ).value,


                notes:
                    document.getElementById(
                        "notes"
                    ).value,


                design_summary:
                    document.getElementById(
                        "designSummary"
                    ).value,


                artwork:
                    null,


                designs: designs

            };



            console.log(
                "Sending quote:",
                formData
            );



            /*
            SEND TO EDGE FUNCTION
            */


            const response =
                await fetch(
                    `${SUPABASE_URL}/functions/v1/new-quote-notification`,
                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${SUPABASE_KEY}`

                        },


                        body:
                            JSON.stringify(
                                formData
                            )

                    }
                );



            const result =
                await response.json();



            console.log(
                "Server response:",
                result
            );



            if (!result.success) {

                throw new Error(
                    result.error ||
                    "Quote failed"
                );

            }



            alert(
                "Quote submitted successfully!\n\nYour quote number is:\n" +
                result.quote_number
            );



            /*
            CLEAR FORM
            */


            quoteForm.reset();


            localStorage.removeItem(
                "manicQuoteBasket"
            );



            if (
                typeof updateQuoteSummary ===
                "function"
            ) {

                updateQuoteSummary();

            }



        }


        catch(error) {


            console.error(
                "Quote Error:",
                error
            );


            alert(
                "Sorry, there was an error sending your quote.\n\nPlease try again."
            );


        }



        finally {


            submitButton.disabled =
                false;


            submitButton.innerText =
                "Request My Quote";


        }



    });


});
