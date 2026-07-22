/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUMMARY
VERSION 3.0
CHUNK 1
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("QUOTE SUMMARY V3 LOADED");

    /*==================================================
    ELEMENTS
    ==================================================*/

    const form = document.querySelector("form");

    const quoteSummary =
        document.getElementById("quoteSummary");

    const clearQuotes =
        document.getElementById("clearQuotes");

    const designSummary =
        document.getElementById("designSummary");

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

    console.log(
        "Quote Items Loaded:",
        quoteItems
    );

    if (!quoteSummary) {

        console.error(
            "quoteSummary element not found."
        );

        return;

    }

    /*==================================================
    SAVE QUOTES
    ==================================================*/

    function saveQuotes() {

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

        let emailText = "";

        quoteItems.forEach(function (item, index) {

            const card =
                document.createElement("div");

            card.className =
                "quote-summary-item";

            card.innerHTML = `

                <img
                    src="${item.image}"
                    class="quote-summary-image"
                    alt="Design Preview">

                <h3>
                    Design ${index + 1}
                </h3>

                <p>
                    <strong>Shirt Colour:</strong>
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

            emailText +=
`Design ${index + 1}
Shirt Colour: ${item.colour}
Shirt Size: ${item.shirtSize}
Print Location: ${item.location}
Design Size: ${item.size}px
Quantity: ${item.quantity}
Notes: ${item.notes || "None"}

`;

        });

        if (designSummary) {

            designSummary.value =
                emailText;

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

                saveQuotes();

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

                if (!confirm(
                    "Clear all designs from your quote?"
                )) {

                    return;

                }

                quoteItems = [];

                saveQuotes();

                buildSummary();

            }
        );

    }
    /*==================================================
    SUBMIT QUOTE
    ==================================================*/

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            alert("Starting quote submission...");

const test = await supabase
    .from("customers")
    .select("*")
    .limit(1);

alert(JSON.stringify(test));

            try {

                /*==============================
                CHECK SUPABASE
                ==============================*/

                if (typeof supabase === "undefined") {

                    throw new Error(
                        "Supabase client not found. Check supabase.js is loaded."
                    );

                }

                console.log("Supabase client found.");

                /*==============================
                SAVE CUSTOMER
                ==============================*/

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

                alert("About to save customer");

const result = await supabase
    .from("customers")
    .insert(customerData)
    .select()
    .single();

alert("Customer request finished");

alert(JSON.stringify(result));

const customer = result.data;
const customerError = result.error;

if (customerError) {
    throw customerError;
}

                console.log("Customer saved.", customer);
                /*==============================
                SAVE QUOTE
                ==============================*/

                const quoteData = {

                    customer_id: customer.id,

                    service:
                        document.getElementById("service").value,

                    quantity:
                        document.getElementById("quantity").value,

                    required_date:
                        document.getElementById("requiredDate").value || null,

                    delivery: "Website",

                    notes:
                        document.getElementById("notes").value

                };

                console.log("Saving quote...", quoteData);

                const {
                    data: quote,
                    error: quoteError
                } = await supabase
                    .from("quotes")
                    .insert(quoteData)
                    .select()
                    .single();

                if (quoteError) {

                    console.error(quoteError);

                    throw quoteError;

                }

                console.log("Quote saved.", quote);

                /*==============================
                SAVE DESIGNS
                ==============================*/

                for (const item of quoteItems) {

                    const { error: designError } =
                        await supabase
                            .from("designs")
                            .insert({

                                quote_id: quote.id,

                                image_url: item.image,

                                shirt_colour: item.colour,

                                shirt_size: item.shirtSize,

                                print_location: item.location,

                                design_size: item.size,

                                rotation: item.rotation,

                                quantity: item.quantity,

                                notes: item.notes

                            });

                    if (designError) {

                        console.error(designError);

                        throw designError;

                    }

                }

                console.log("All designs saved.");

                alert("Quote saved successfully!");

                localStorage.removeItem("manicQuoteBasket");

                form.submit();

            }

            catch (error) {

                console.error("SUBMIT ERROR:", error);

                alert(
                    error.message ||
                    JSON.stringify(error)
                );

            }

        });

    }
    /*==================================================
    INITIALISE PAGE
    ==================================================*/

    buildSummary();

});
