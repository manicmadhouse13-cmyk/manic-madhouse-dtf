alert("QUOTE SUMMARY FILE LOADED");
/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUMMARY
VERSION 5.0
CHUNK 1
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("QUOTE SUMMARY V5 LOADED");

    /*==================================================
    ELEMENTS
    ==================================================*/

    const form =
        document.querySelector("form");
    alert("FORM CHECK: " + form);

    const quoteSummary =
        document.getElementById("quoteSummary");

    const clearQuotes =
        document.getElementById("clearQuotes");

    const designSummary =
        document.getElementById("designSummary");

    if (!quoteSummary) {
        console.error("Quote Summary element not found.");
        return;
    }

    /*==================================================
    LOAD QUOTE BASKET
    ==================================================*/

    let quoteItems = [];

    try {

        quoteItems =
            JSON.parse(
                localStorage.getItem("manicQuoteBasket")
            ) || [];

    }

    catch (error) {

    console.error(
        "Failed loading quote basket",
        error
    );

    quoteItems = [];

    }

    /*==================================================
    SAVE QUOTE BASKET
    ==================================================*/

    function saveQuoteBasket() {

        localStorage.setItem(
            "manicQuoteBasket",
            JSON.stringify(quoteItems)
        );

    }

    /*==================================================
    BUILD SUMMARY
    ==================================================*/

    function buildSummary() {

        quoteSummary.innerHTML = "";

        if (quoteItems.length === 0) {

            quoteSummary.innerHTML = `
                <p>No designs added yet.</p>
            `;

            if (designSummary) {

                designSummary.value =
                    "No designs selected.";

            }

            return;

        }

        let emailSummary = "";

        quoteItems.forEach(function (item, index) {

            const card =
                document.createElement("div");

            card.className =
                "quote-summary-item";

            card.innerHTML = `

                <img
                src="${item.image}"
                class="quote-summary-image"
                alt="Design">

                <h3>
                    Design ${index + 1}
                </h3>

                <p>
                    <strong>Colour:</strong>
                    ${item.colour}
                </p>

                <p>
                    <strong>Shirt Size:</strong>
                    ${item.shirtSize}
                </p>

                <p>
                    <strong>Print Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Design Size:</strong>
                    ${item.size}px
                </p>

                <p>
                    <strong>Quantity:</strong>
                    ${item.quantity}
                </p>

                <p>
                    <strong>Notes:</strong>
                    ${item.notes || "None"}
                </p>

                <button
                class="remove-quote"
                data-id="${item.id}">
                Remove
                </button>

                <hr>

            `;

            quoteSummary.appendChild(card);

            emailSummary += `

Design ${index + 1}

Colour: ${item.colour}

Shirt Size: ${item.shirtSize}

Print Location: ${item.location}

Design Size: ${item.size}px

Quantity: ${item.quantity}

Notes: ${item.notes || "None"}

`;

        });

        if (designSummary) {

            designSummary.value =
                emailSummary;

        }

        attachRemoveButtons();

}
    /*==================================================
    REMOVE BUTTONS
    ==================================================*/

    function attachRemoveButtons() {

        const buttons =
            document.querySelectorAll(".remove-quote");

        buttons.forEach(function (button) {

            button.addEventListener("click", function () {

                const id =
                    Number(this.dataset.id);

                quoteItems =
                    quoteItems.filter(function (item) {

                        return item.id !== id;

                    });

                saveQuoteBasket();

                buildSummary();

            });

        });

    }

    /*==================================================
    CLEAR QUOTE BASKET
    ==================================================*/

    if (clearQuotes) {

        clearQuotes.addEventListener(
            "click",
            function () {

                if (
                    !confirm(
                        "Clear all designs from your quote?"
                    )
                ) {

                    return;

                }

                quoteItems = [];

                saveQuoteBasket();

                buildSummary();

            }
        );

    }

    /*==================================================
    SAVE CUSTOMER
    ==================================================*/

    async function saveCustomer() {

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
            data,
            error
        } =
        await window.db
            .from("customers")
            .insert(customerData)
            .select()
            .single();

        if (error) {

            throw error;

        }

        return data;

    }

    /*==================================================
    SAVE QUOTE
    ==================================================*/

    async function saveQuote(customerId) {

    /*=========================================
    GET NEXT QUOTE NUMBER
    =========================================*/

    const { data: lastQuote } = await window.db
        .from("quotes")
        .select("quote_number")
        .order("id", { ascending: false })
        .limit(1);

    let nextNumber = 1;

    if (
        lastQuote &&
        lastQuote.length > 0 &&
        lastQuote[0].quote_number
    ) {

        nextNumber =
            parseInt(
                lastQuote[0].quote_number.replace("MM-", "")
            ) + 1;

    }

    const quoteNumber =
        "MM-" +
        String(nextNumber).padStart(6, "0");

    const quoteData = {

        customer_id: customerId,

        quote_number: quoteNumber,

        service:
            document.getElementById("service").value,

        required_date:
            document.getElementById("requiredDate").value || null,

        delivery:
            "Website",

        notes:
            document.getElementById("notes").value

    };
alert(JSON.stringify(quoteData));
        const {
            data,
            error
        } =
        await window.db
            .from("quotes")
            .insert(quoteData)
            .select()
            .single();

        if (error) {

            throw error;

        }

        return data;

    }
    /*==================================================
    SAVE DESIGNS
    ==================================================*/

    async function saveDesigns(quoteId) {

        if (quoteItems.length === 0) {
            return;
        }

        for (const item of quoteItems) {

            const designData = {

                quote_id: quoteId,

                image_url: item.image || "",

                shirt_colour: item.colour || "",

                shirt_size: item.shirtSize || "",

                print_location: item.location || "",

                design_size: Number(item.size) || 0,

                rotation: Number(item.rotation) || 0,

                quantity: String(item.quantity || ""),

                notes: item.notes || ""

            };

            const { error } =
                await window.db
                    .from("designs")
                    .insert(designData);

            if (error) {

                throw error;

            }

        }

    }

    /*==================================================
    CLEAR QUOTE AFTER SUCCESS
    ==================================================*/

    function clearQuoteBasket() {

        quoteItems = [];

        localStorage.removeItem(
            "manicQuoteBasket"
        );

        if (designSummary) {

            designSummary.value = "";

        }

        buildSummary();

    }

    /*==================================================
    VALIDATE FORM
    ==================================================*/

    function validateForm() {

        if (
            document.getElementById("fullName").value.trim() === ""
        ) {

            throw new Error(
                "Please enter your full name."
            );

        }

        if (
            document.getElementById("email").value.trim() === ""
        ) {

            throw new Error(
                "Please enter your email address."
            );

        }

        if (
            document.getElementById("projectDescription").value.trim() === ""
        ) {

            throw new Error(
                "Please describe your project."
            );

        }

    }    /*==================================================
    SUBMIT QUOTE
    ==================================================*/
alert("REACHED SUBMIT SECTION");
    if (form) {

        form.addEventListener("submit", async function (event) {
            alert("Submit event intercepted");
event.preventDefault();


            try {

                validateForm();

                if (!window.db) {

                    throw new Error(
                        "Supabase database connection not found."
                    );

                }

                console.log("Saving customer...");

                const customer =
                    await saveCustomer();

                console.log("Customer Saved", customer);

                console.log("Saving quote...");

                const quote =
    await saveQuote(customer.id);

console.log("Quote Saved", quote);

alert(
    "Your Quote Number is: " +
    quote.quote_number
);

                console.log("Saving designs...");

                await saveDesigns(quote.id);

                console.log("Designs Saved");

                clearQuoteBasket();

                alert(
                    "Your quote request has been submitted successfully!"
                );

                form.submit();

            }

            catch (error) {

                console.error(error);

            
);

clearQuoteBasket();

localStorage.removeItem("manicQuoteBasket");

form.reset();

window.location.href = "thankyou.html";

    /*==================================================
    INITIALISE PAGE
    ==================================================*/

    buildSummary();

    console.log(
        "QUOTE SUMMARY VERSION 5.0 READY"
    );


