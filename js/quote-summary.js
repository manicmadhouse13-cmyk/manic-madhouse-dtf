alert("THIS IS VERSION 4 - " + new Date().toLocaleTimeString());

/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SUMMARY
VERSION 4.0
CHUNK 1
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("QUOTE SUMMARY V4 LOADED");

    /*==================================================
    ELEMENTS
    ==================================================*/

    const form =
        document.querySelector("form");

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

        if (!quoteSummary) return;

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

            emailSummary +=

`Design ${index + 1}

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

                const id = Number(this.dataset.id);

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

        clearQuotes.addEventListener("click", function () {

            if (!confirm("Clear all designs from your quote?")) {

                return;

            }

            quoteItems = [];

            saveQuoteBasket();

            buildSummary();

        });

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

        const { data, error } =
            await supabase
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

        const quoteData = {

            customer_id: customerId,

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

        const { data, error } =
            await supabase
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

        for (const item of quoteItems) {

            const { error } =
                await supabase
                    .from("designs")
                    .insert({

                        quote_id: quoteId,

                        image_url: item.image,

                        shirt_colour: item.colour,

                        shirt_size: item.shirtSize,

                        print_location: item.location,

                        design_size: item.size,

                        rotation: item.rotation,

                        quantity: item.quantity,

                        notes: item.notes

                    });

            if (error) {

                throw error;

            }

        }

    }
    /*==================================================
    SUBMIT QUOTE
    ==================================================*/

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            try {

                console.log("Starting quote submission...");

                if (!window.supabase || !supabase) {

                    throw new Error(
                        "Supabase is not connected."
                    );

                }

                const customer =
                    await saveCustomer();

                console.log(
                    "Customer saved:",
                    customer
                );

                const quote =
                    await saveQuote(customer.id);

                console.log(
                    "Quote saved:",
                    quote
                );

                await saveDesigns(quote.id);

                console.log(
                    "Designs saved."
                );

                localStorage.removeItem(
                    "manicQuoteBasket"
                );

                alert(
                    "Quote saved successfully!"
                );

                form.submit();

            }

            catch (error) {

                console.error(
                    "Quote submission failed:",
                    error
                );

                alert(

                    error.message ||

                    "There was a problem saving your quote."

                );

            }

        });

    }
    /*==================================================
    INITIALISE PAGE
    ==================================================*/

    buildSummary();

    console.log("QUOTE SUMMARY V4 READY");

});
