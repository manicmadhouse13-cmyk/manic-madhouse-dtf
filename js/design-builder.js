/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 10.1

FIXED:
- Upload artwork
- Live shirt preview
- Resize
- Rotate
- Drag
- Reset
- Shirt colour
- Shirt size
- Print location
- Quantity
- Notes
- Quote basket
- Remove items
- Local storage
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("Manic Madhouse Design Builder V10.1 Loaded");

    /*==================================================
    ELEMENTS
    ==================================================*/

    const shirt = document.getElementById("shirt");
    const designPreview = document.getElementById("designPreview");
    const uploadImage = document.getElementById("uploadImage");

    const sizeSlider = document.getElementById("sizeSlider");
    const sizeValue = document.getElementById("sizeValue");

    const rotateSlider = document.getElementById("rotateSlider");
    const rotateValue = document.getElementById("rotateValue");

    const shirtColour = document.getElementById("shirtColour");
    const shirtSize = document.getElementById("shirtSize");
    const printLocation = document.getElementById("printLocation");

    const quantity = document.getElementById("quantity");
    const extraNotes = document.getElementById("extraNotes");

    const addQuoteBtn = document.getElementById("addQuote");
    const resetBuilder = document.getElementById("resetBuilder");

    const quoteBasket = document.getElementById("quoteBasket");

    /*==================================================
    BUILDER DATA
    ==================================================*/

    let builderData = {
        image: "",
        size: 180,
        rotation: 0,
        x: 0,
        y: 0,
        colour: shirtColour ? shirtColour.value : "Black",
        shirtSize: shirtSize ? shirtSize.value : "M",
        location: printLocation ? printLocation.value : "Front",
        quantity: quantity ? Number(quantity.value) || 1 : 1,
        notes: ""
    };

    let quoteItems = [];

    try {
        quoteItems =
            JSON.parse(
                localStorage.getItem("manicQuoteBasket")
            ) || [];
    } catch (error) {
        console.log("Quote basket loading error", error);
        quoteItems = [];
    }

    /*==================================================
    UPDATE PREVIEW
    ==================================================*/

    function updatePreview() {

        if (!designPreview) return;

        /*
        Force the important visual properties.
        This prevents existing CSS from overriding
        the builder sliders.
        */

        designPreview.style.setProperty(
            "width",
            builderData.size + "px",
            "important"
        );

        designPreview.style.setProperty(
            "height",
            "auto",
            "important"
        );

        designPreview.style.setProperty(
            "left",
            "calc(50% + " + builderData.x + "px)",
            "important"
        );

        designPreview.style.setProperty(
            "top",
            "calc(50% + " + builderData.y + "px)",
            "important"
        );

        designPreview.style.setProperty(
            "transform",
            "translate(-50%, -50%) rotate(" +
                builderData.rotation +
                "deg)",
            "important"
        );

        designPreview.style.setProperty(
            "transform-origin",
            "center center",
            "important"
        );

        if (sizeValue) {
            sizeValue.textContent =
                builderData.size + "px";
        }

        if (rotateValue) {
            rotateValue.textContent =
                builderData.rotation + "°";
        }
    }

    /*==================================================
    IMAGE UPLOAD
    ==================================================*/

    if (uploadImage) {

        uploadImage.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files &&
                    event.target.files[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {
                    alert("Please upload an image file.");
                    uploadImage.value = "";
                    return;
                }

                const reader = new FileReader();

                reader.onload = function (e) {

                    builderData.image =
                        e.target.result;

                    builderData.x = 0;
                    builderData.y = 0;
                    builderData.rotation = 0;

                    if (designPreview) {

                        designPreview.src =
                            builderData.image;

                        designPreview.style.setProperty(
                            "display",
                            "block",
                            "important"
                        );
                    }

                    if (rotateSlider) {
                        rotateSlider.value = 0;
                    }

                    if (sizeSlider) {
                        sizeSlider.value =
                            builderData.size;
                    }

                    updatePreview();

                    console.log(
                        "Artwork uploaded successfully"
                    );
                };

                reader.readAsDataURL(file);
            }
        );
    }

    /*==================================================
    RESIZE SLIDER
    ==================================================*/

    if (sizeSlider) {

        sizeSlider.value =
            builderData.size;

        sizeSlider.addEventListener(
            "input",
            function () {

                builderData.size =
                    Number(this.value);

                updatePreview();

                console.log(
                    "Design size:",
                    builderData.size
                );
            }
        );
    }

    /*==================================================
    ROTATION SLIDER
    ==================================================*/

    if (rotateSlider) {

        rotateSlider.value =
            builderData.rotation;

        rotateSlider.addEventListener(
            "input",
            function () {

                builderData.rotation =
                    Number(this.value);

                updatePreview();

                console.log(
                    "Design rotation:",
                    builderData.rotation
                );
            }
        );
    }

    /*==================================================
    SHIRT COLOUR
    ==================================================*/

    if (shirtColour) {

        shirtColour.addEventListener(
            "change",
            function () {

                builderData.colour =
                    this.value;

                changeShirtColour();
            }
        );
    }

    function changeShirtColour() {

        if (!shirt) return;

        builderData.colour =
            shirtColour
                ? shirtColour.value
                : builderData.colour;

        shirt.dataset.colour =
            builderData.colour;

        /*
        Supports shirt colour image swapping
        if data-black, data-white etc. exist.
        */

        if (shirt.tagName === "IMG") {

            const colourName =
                String(builderData.colour)
                    .toLowerCase()
                    .replace(/\s+/g, "");

            const newSource =
                shirt.getAttribute(
                    "data-" + colourName
                );

            if (newSource) {
                shirt.src = newSource;
            }
        }
    }

    /*==================================================
    SHIRT SIZE
    ==================================================*/

    if (shirtSize) {

        shirtSize.addEventListener(
            "change",
            function () {

                builderData.shirtSize =
                    this.value;
            }
        );
    }

    /*==================================================
    PRINT LOCATION
    ==================================================*/

    if (printLocation) {

        printLocation.addEventListener(
            "change",
            function () {

                builderData.location =
                    this.value;
            }
        );
    }

    /*==================================================
    QUANTITY
    ==================================================*/

    if (quantity) {

        quantity.addEventListener(
            "change",
            function () {

                builderData.quantity =
                    Number(this.value) || 1;
            }
        );
    }

    /*==================================================
    DRAGGING
    ==================================================*/

    let dragging = false;
    let startX = 0;
    let startY = 0;

    if (designPreview) {

        designPreview.addEventListener(
            "pointerdown",
            function (event) {

                if (!builderData.image) return;

                dragging = true;

                designPreview.setPointerCapture(
                    event.pointerId
                );

                startX =
                    event.clientX -
                    builderData.x;

                startY =
                    event.clientY -
                    builderData.y;

                event.preventDefault();
            }
        );

        designPreview.addEventListener(
            "pointermove",
            function (event) {

                if (!dragging) return;

                builderData.x =
                    event.clientX -
                    startX;

                builderData.y =
                    event.clientY -
                    startY;

                updatePreview();

                event.preventDefault();
            }
        );

        designPreview.addEventListener(
            "pointerup",
            function (event) {

                dragging = false;

                try {
                    designPreview.releasePointerCapture(
                        event.pointerId
                    );
                } catch (error) {
                    // Pointer capture may already be released.
                }
            }
        );

        designPreview.addEventListener(
            "pointercancel",
            function () {
                dragging = false;
            }
        );

        designPreview.addEventListener(
            "touchmove",
            function (event) {

                if (dragging) {
                    event.preventDefault();
                }
            },
            {
                passive: false
            }
        );
    }

    /*==================================================
    RESET BUILDER
    ==================================================*/

    if (resetBuilder) {

        resetBuilder.addEventListener(
            "click",
            function () {

                builderData = {
                    image: "",
                    size: 180,
                    rotation: 0,
                    x: 0,
                    y: 0,
                    colour: shirtColour
                        ? shirtColour.value
                        : "Black",
                    shirtSize: shirtSize
                        ? shirtSize.value
                        : "M",
                    location: printLocation
                        ? printLocation.value
                        : "Front",
                    quantity: quantity
                        ? Number(quantity.value) || 1
                        : 1,
                    notes: ""
                };

                if (designPreview) {

                    designPreview.src = "";

                    designPreview.style.setProperty(
                        "display",
                        "none",
                        "important"
                    );
                }

                if (uploadImage) {
                    uploadImage.value = "";
                }

                if (sizeSlider) {
                    sizeSlider.value =
                        builderData.size;
                }

                if (rotateSlider) {
                    rotateSlider.value =
                        builderData.rotation;
                }

                if (sizeValue) {
                    sizeValue.textContent =
                        builderData.size + "px";
                }

                if (rotateValue) {
                    rotateValue.textContent =
                        builderData.rotation + "°";
                }

                updatePreview();

                console.log(
                    "Design builder reset"
                );
            }
        );
    }

    /*==================================================
    ADD TO QUOTE
    ==================================================*/

    if (addQuoteBtn) {

        console.log(
            "ADD QUOTE BUTTON CONNECTED"
        );

        addQuoteBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "ADD QUOTE CLICKED"
                );

                if (!builderData.image) {

                    alert(
                        "Please upload your artwork before adding to quote."
                    );

                    return;
                }

                builderData.notes =
                    extraNotes
                        ? extraNotes.value
                        : "";

                const quoteItem = {

                    id: Date.now(),

                    image:
                        builderData.image,

                    size:
                        builderData.size,

                    designSize:
                        builderData.size,

                    rotation:
                        builderData.rotation,

                    colour:
                        builderData.colour,

                    shirtColour:
                        builderData.colour,

                    shirtSize:
                        builderData.shirtSize,

                    location:
                        builderData.location,

                    printLocation:
                        builderData.location,

                    quantity:
                        builderData.quantity,

                    notes:
                        builderData.notes,

                    x:
                        builderData.x,

                    y:
                        builderData.y
                };

                quoteItems.push(
                    quoteItem
                );

                saveQuoteBasket();

                updateQuoteBasketDisplay();

                alert(
                    "Design added to quote."
                );

                console.log(
                    "Design saved:",
                    quoteItem
                );
            }
        );
    }

    /*==================================================
    SAVE QUOTE BASKET
    ==================================================*/

    function saveQuoteBasket() {

        try {

            localStorage.setItem(
                "manicQuoteBasket",
                JSON.stringify(quoteItems)
            );

            console.log(
                "Saved quote basket:",
                quoteItems
            );

        } catch (error) {

            console.error(
                "Could not save quote basket:",
                error
            );

            alert(
                "There was a problem saving your design. Please try again."
            );
        }
    }

    /*==================================================
    DISPLAY QUOTE BASKET
    ==================================================*/

    function updateQuoteBasketDisplay() {

        if (!quoteBasket) return;

        quoteBasket.innerHTML = "";

        if (quoteItems.length === 0) {

            quoteBasket.innerHTML =
                "<p>No designs added yet.</p>";

            return;
        }

        quoteItems.forEach(
            function (item) {

                const card =
                    document.createElement("div");

                card.className =
                    "quote-item";

                card.innerHTML = `

                    <img
                        src="${item.image}"
                        class="quote-image"
                        alt="Custom DTF Design"
                    >

                    <div class="quote-details">

                        <strong>
                            Custom DTF Design
                        </strong>

                        <span>
                            Colour:
                            ${item.colour || item.shirtColour || "N/A"}
                        </span>

                        <span>
                            Shirt Size:
                            ${item.shirtSize || "N/A"}
                        </span>

                        <span>
                            Print Location:
                            ${item.location || item.printLocation || "N/A"}
                        </span>

                        <span>
                            Design Size:
                            ${item.size || item.designSize || "N/A"}px
                        </span>

                        <span>
                            Rotation:
                            ${item.rotation ?? 0}°
                        </span>

                        <span>
                            Quantity:
                            ${item.quantity || 1}
                        </span>

                        <span>
                            Notes:
                            ${item.notes || "None"}
                        </span>

                    </div>

                    <button
                        type="button"
                        class="remove-quote"
                        data-id="${item.id}">
                        Remove
                    </button>
                `;

                quoteBasket.appendChild(
                    card
                );
            }
        );

        attachRemoveButtons();
    }

    /*==================================================
    REMOVE QUOTE ITEMS
    ==================================================*/

    function attachRemoveButtons() {

        const buttons =
            document.querySelectorAll(
                ".remove-quote"
            );

        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                this.dataset.id
                            );

                        quoteItems =
                            quoteItems.filter(
                                function (item) {
                                    return item.id !== id;
                                }
                            );

                        saveQuoteBasket();

                        updateQuoteBasketDisplay();
                    }
                );
            }
        );
    }

    /*==================================================
    INITIAL PREVIEW STYLING
    ==================================================*/

    if (designPreview) {

        designPreview.style.setProperty(
            "position",
            "absolute",
            "important"
        );

        designPreview.style.setProperty(
            "cursor",
            "move",
            "important"
        );

        designPreview.style.setProperty(
            "user-select",
            "none",
            "important"
        );

        designPreview.style.setProperty(
            "touch-action",
            "none",
            "important"
        );

        designPreview.style.setProperty(
            "max-width",
            "none",
            "important"
        );

        designPreview.style.setProperty(
            "height",
            "auto",
            "important"
        );

        designPreview.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    /*==================================================
    INITIAL VALUES
    ==================================================*/

    if (sizeSlider) {
        sizeSlider.value =
            builderData.size;
    }

    if (rotateSlider) {
        rotateSlider.value =
            builderData.rotation;
    }

    updatePreview();

    /*==================================================
    LOAD EXISTING QUOTE BASKET
    ==================================================*/

    updateQuoteBasketDisplay();

    /*==================================================
    EXPOSE BUILDER
    ==================================================*/

    window.ManicMadhouseBuilder = {

        getQuoteBasket: function () {
            return quoteItems;
        },

        clearQuoteBasket: function () {

            quoteItems = [];

            saveQuoteBasket();

            updateQuoteBasketDisplay();
        },

        refreshQuoteBasket: function () {
            updateQuoteBasketDisplay();
        },

        getBuilderData: function () {
            return {
                ...builderData
            };
        }
    };

    console.log(
        "Manic Madhouse Design Builder V10.1 Ready"
    );

});
