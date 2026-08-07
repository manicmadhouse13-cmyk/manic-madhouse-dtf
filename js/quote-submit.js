/*==================================================
 MANIC MADHOUSE DTF DESIGNS
 QUOTE SUBMIT
 VERSION 2.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Quote Submit V2 Loaded");

    //------------------------------------------------
    // CONFIGURATION
    //------------------------------------------------

    const CONFIG = {

        basketKey: "manicQuoteBasket",

        quotePrefix: "MM-",

        edgeFunction:
            "https://ymkmpsgossabyznwhluk.supabase.co/functions/v1/new-quote-notification",

        thankYouPage:
            "thankyou.html"

    };

    //------------------------------------------------
    // FORM
    //------------------------------------------------

    const form = document.getElementById("quoteForm");
    //------------------------------------------------
    // SUBMIT BUTTON CONTROL
    //------------------------------------------------

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    function setSubmitting(state) {


        if (!submitButton) {
            return;
        }


        submitButton.disabled = state;


        submitButton.textContent =
            state
                ? "Submitting Quote..."
                : "Request My Quote";


    }
    if (!form) {

        console.error("Quote Form Not Found");

        return;

    }

    //------------------------------------------------
    // HELPERS
    //------------------------------------------------

    const getValue = (id) => {

        const element = document.getElementById(id);

        return element ? element.value.trim() : "";

    };

    const getBasket = () => {

        return JSON.parse(
            localStorage.getItem(CONFIG.basketKey)
        ) || [];

    };

    const clearBasket = () => {

        localStorage.removeItem(CONFIG.basketKey);

    };

    const generateQuoteNumber = (id) => {

        return CONFIG.quotePrefix +
            String(id).padStart(6, "0");

    };    //------------------------------------------------
    // VALIDATION
    //------------------------------------------------

    function validateForm() {

        if (!getValue("fullName")) {
            throw new Error("Please enter your Full Name.");
        }

        if (!getValue("email")) {
            throw new Error("Please enter your Email Address.");
        }

        if (!getValue("service")) {
            throw new Error("Please select a Service.");
        }

        const basket = getBasket();

        if (basket.length === 0) {
            throw new Error("Your quote basket is empty.");
        }

        return true;

    }

    //------------------------------------------------
    // CUSTOMER DATA
    //------------------------------------------------

    function buildCustomer() {

        return {

            full_name: getValue("fullName"),

            business_name: getValue("businessName"),

            email: getValue("email"),

            phone: getValue("phone")

        };

    }

    //------------------------------------------------
    // QUOTE DATA
    //------------------------------------------------

    function buildQuote(customerId) {

        return {

            customer_id: customerId,

            service: getValue("service"),

            required_date:
                getValue("requiredDate") || null,

            delivery: "Website",

            notes: getValue("notes")

        };

    }

    //------------------------------------------------
    // EMAIL PAYLOAD
    //------------------------------------------------

    function buildEmailPayload(quoteId) {

        return {

            quoteNumber: quoteId,

            customerName: getValue("fullName"),

            businessName: getValue("businessName"),

            email: getValue("email"),

            phone: getValue("phone"),

            service: getValue("service"),

            quantity: getValue("quantity"),

            requiredDate: getValue("requiredDate"),

            printLocation: getValue("printLocation"),

            garmentColour: getValue("garmentColour"),

            sizes: getValue("sizes"),

            projectDescription:
                getValue("projectDescription"),

            notes: getValue("notes")

        };

    }    //------------------------------------------------
    // DATABASE
    //------------------------------------------------

    async function saveCustomer() {

        const { data, error } = await window.db
            .from("customers")
            .insert(buildCustomer())
            .select()
            .single();

        if (error) {
            throw error;
        }

        console.log("✔ Customer Saved");

        return data;

    }

    async function saveQuote(customerId) {

        const { data, error } = await window.db
            .from("quotes")
            .insert(buildQuote(customerId))
            .select()
            .single();

        if (error) {
            throw error;
        }

        console.log("✔ Quote Saved");

        return data;

    }

    async function saveDesigns(quoteId) {

        const basket = getBasket();

        if (basket.length === 0) {
            return;
        }

        for (const item of basket) {

            const design = {

                quote_id: quoteId,

                image_url: item.image || "",

                shirt_colour: item.colour || "",

                shirt_size: item.shirtSize || "",

                print_location: item.location || "",

                design_size: Number(item.size) || 0,

                rotation: Number(item.rotation) || 0,

                quantity: Number(item.quantity) || 1,

                notes: item.notes || ""

            };

            const { error } = await window.db
                .from("designs")
                .insert(design);

            if (error) {
                throw error;
            }

        }

        console.log(`✔ ${basket.length} Design(s) Saved`);

    }
    //------------------------------------------------
    // SEND EMAIL NOTIFICATION
    //------------------------------------------------

    async function sendQuoteNotification(quoteId) {


        const response = await fetch(
            CONFIG.edgeFunction,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify(
                    buildEmailPayload(quoteId)
                )

            }
        );


        if (!response.ok) {


            const errorText =
                await response.text();


            console.error(
                "Email Error:",
                errorText
            );


            throw new Error(
                "Email notification failed"
            );

        }


        console.log("✔ Emails Sent");

    }



    //------------------------------------------------
    // SUBMIT PROCESS
    //------------------------------------------------

    async function processQuote() {


        console.log(
            "Starting Quote Submission..."
        );


        validateForm();


        const customer =
            await saveCustomer();



        const quote =
            await saveQuote(customer.id);



        const quoteNumber =
            generateQuoteNumber(
                quote.id
            );


        localStorage.setItem(
            "lastQuoteNumber",
            quoteNumber
        );



        await saveDesigns(
            quote.id
        );



        await sendQuoteNotification(
            quoteNumber
        );



        clearBasket();



        console.log(
            "✔ Quote Complete"
        );


        window.location.href =
            CONFIG.thankYouPage;


    }



    //------------------------------------------------
    // FORM SUBMIT EVENT
    //------------------------------------------------

    form.addEventListener(
        "submit",
        async (event) => {


            event.preventDefault();


            try {
             
setSubmitting(true);

                await processQuote();



            }
            catch(error) {


                console.error(
                    error
                );
setSubmitting(false);

                alert(
                    error.message
                );


            }


        }
    );
