/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUBMIT SYSTEM
FINAL VERSION
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const quoteForm = document.getElementById("quoteForm");

    if (!quoteForm) {
        console.log("Quote form not found");
        return;
    }

    console.log("Manic Madhouse Quote Submit System Loaded");


    quoteForm.addEventListener("submit", async function (e) {

        e.preventDefault();


        const submitButton =
            quoteForm.querySelector('button[type="submit"]');


        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = "Sending Quote...";
        }


        try {

            /*==================================================
            GET DESIGN BASKET
            ==================================================*/

            let designs = [];

            try {

                designs =
                    JSON.parse(
                        localStorage.getItem("manicQuoteBasket")
                    ) || [];

            } catch (error) {

                console.warn(
                    "Could not read design basket:",
                    error
                );

                designs = [];
            }


            /*==================================================
            GET FORM VALUES
            ==================================================*/

            const fullName =
                document.getElementById("fullName")?.value.trim() || "";

            const businessName =
                document.getElementById("businessName")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim() || "";

            const phone =
                document.getElementById("phone")?.value.trim() || "";

            const contactMethod =
                document.getElementById("contactMethod")?.value || "Email";

            const service =
                document.getElementById("service")?.value || "";

            const quantity =
                document.getElementById("quantity")?.value || "";

            const requiredDate =
                document.getElementById("requiredDate")?.value || null;

            const printLocation =
                document.getElementById("printLocation")?.value || "";

            const garmentColour =
                document.getElementById("garmentColour")?.value.trim() || "";

            const sizes =
                document.getElementById("sizes")?.value.trim() || "";

            const projectDescription =
                document.getElementById("projectDescription")?.value.trim() || "";

            const notes =
                document.getElementById("notes")?.value.trim() || "";


            /*==================================================
            BUILD DESIGN SUMMARY
            ==================================================*/

            let designSummary = "";

            if (designs.length > 0) {

                designSummary = designs.map(function (design, index) {

                    return `
Design ${index + 1}:
Shirt Colour: ${design.shirtColour || design.colour || "N/A"}
Shirt Size: ${design.shirtSize || "N/A"}
Print Location: ${design.printLocation || "N/A"}
Design Size: ${design.designSize || design.size || "N/A"}
Rotation: ${design.rotation || "0"}°
Quantity: ${design.quantity || "N/A"}
Notes: ${design.notes || "N/A"}
`;

                }).join("\n");

            } else {

                designSummary =
                    "No Design Builder designs were added.";

            }


            /*==================================================
            VALIDATE EMAIL
            ==================================================*/

            if (!email) {
                throw new Error(
                    "Please enter your email address."
                );
            }


            /*==================================================
            STEP 1
            CALL EXISTING SUPABASE SQL FUNCTION
            ==================================================*/

            console.log(
                "Submitting quote to Supabase..."
            );


            const { data: quoteData, error: quoteError } =
                await window.supabaseClient.rpc(
                    "submit_quote",
                    {
                        p_full_name: fullName,
                        p_business_name: businessName,
                        p_email: email,
                        p_phone: phone,
                        p_service: service,
                        p_required_date: requiredDate,
                        p_delivery: "Australia Wide Shipping",
                        p_notes: notes,
                        p_contact_method: contactMethod,
                        p_quantity: quantity,
                        p_print_location: printLocation,
                        p_garment_colour: garmentColour,
                        p_sizes: sizes,
                        p_project_description: projectDescription,
                        p_design_summary: designSummary,
                        p_artwork: null,
                        p_designs: designs
                    }
                );


            if (quoteError) {

                console.error(
                    "Supabase quote error:",
                    quoteError
                );

                throw new Error(
                    quoteError.message ||
                    "Unable to save quote."
                );
            }


            console.log(
                "Supabase quote response:",
                quoteData
            );


            /*==================================================
            GET REAL QUOTE NUMBER
            ==================================================*/

            let savedQuote = quoteData;


            /*
            Supabase can return the JSON object directly
            or sometimes inside an array depending on the RPC.
            */

            if (Array.isArray(savedQuote)) {
                savedQuote = savedQuote[0];
            }


            if (
                typeof savedQuote === "string"
            ) {

                try {
                    savedQuote =
                        JSON.parse(savedQuote);
                } catch {
                    // Leave as-is
                }

            }


            const quoteNumber =
                savedQuote?.quote_number ||
                savedQuote?.quoteNumber ||
                null;


            if (!quoteNumber) {

                console.warn(
                    "Quote was saved but no quote number was returned.",
                    savedQuote
                );

            }


            /*==================================================
            STEP 2
            SEND EMAIL NOTIFICATION
            ==================================================*/

            const emailData = {

                quoteNumber: quoteNumber,

                customerName: fullName,

                businessName: businessName,

                email: email,

                phone: phone,

                contactMethod: contactMethod,

                service: service,

                quantity: quantity,

                requiredDate: requiredDate,

                printLocation: printLocation,

                garmentColour: garmentColour,

                sizes: sizes,

                projectDescription: projectDescription,

                notes: notes,

                designSummary: designSummary,

                designs: designs

            };


            console.log(
                "Sending email data:",
                emailData
            );


            const response =
                await fetch(
                    `${SUPABASE_URL}/functions/v1/new-quote-notification`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${SUPABASE_KEY}`

                        },

                        body:
                            JSON.stringify(
                                emailData
                            )

                    }
                );


            const result =
                await response.json();


            console.log(
                "Email server response:",
                result
            );


            if (!response.ok || !result.success) {

                throw new Error(
                    result.error ||
                    "Email notification failed."
                );

            }


            /*==================================================
            SUCCESS
            ==================================================*/

            const finalQuoteNumber =
                result.quoteNumber ||
                quoteNumber ||
                "Pending";


            alert(
                "Quote submitted successfully!\n\n" +
                "Your quote number is:\n" +
                finalQuoteNumber +
                "\n\n" +
                "A confirmation email has been sent to:\n" +
                email
            );


            /*==================================================
            CLEAR FORM
            ==================================================*/

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


        } catch (error) {

            console.error(
                "Quote submission error:",
                error
            );


            alert(
                "Sorry, there was an error sending your quote.\n\n" +
                (error.message ||
                    "Please try again.")
            );


        } finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerText =
                    "Request My Quote";

            }

        }

    });

});
