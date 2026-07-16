/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 9.0
REBUILD
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
      ELEMENT REFERENCES
    ==================================================*/

    // Builder Container
    const builder = document.getElementById("design-builder");

    // Preview Area
    const shirt = document.getElementById("shirt");
    const designPreview = document.getElementById("designPreview");
    const previewGrid = document.querySelector(".preview-grid");
    const previewWrapper = document.querySelector(".preview-wrapper");

    // Upload
    const uploadImage = document.getElementById("uploadImage");

    // Sliders
    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");

    // Slider Values
    const sizeValue = document.getElementById("sizeValue");
    const rotateValue = document.getElementById("rotateValue");

    // Quantity
    const quantitySelect = document.getElementById("quantity");

    // Notes
    const extraNotes = document.getElementById("extraNotes");

    // Quote Button
    const addQuoteBtn = document.getElementById("addQuote");

    // Reset Button (optional)
    const resetBtn = document.getElementById("resetBuilder");

    // Quote Basket (optional)
    const quoteBasket = document.getElementById("quoteBasket");



    /*==================================================
      BUILDER STATE
    ==================================================*/

    let uploadedImage = null;

    let design = {
        x: 0,
        y: 0,
        scale: 180,
        rotation: 0,
        dragging: false,
        startX: 0,
        startY: 0,
        shirtColour: "white"
    };



    /*==================================================
      INITIALISE BUILDER
    ==================================================*/

    function initialiseBuilder() {

        if (designPreview) {

            designPreview.style.display = "none";
            designPreview.style.left = "50%";
            designPreview.style.top = "50%";

        }

        if (sizeSlider) {

            sizeSlider.value = 180;

        }

        if (rotateSlider) {

            rotateSlider.value = 0;

        }

        if (sizeValue) {

            sizeValue.textContent = "180 px";

        }

        if (rotateValue) {

            rotateValue.textContent = "0°";

        }

        if (quantitySelect) {

            quantitySelect.value = "1";

        }

        if (extraNotes) {

    extraNotes.value = "";

}

loadBuilder();



    /*==================================================
      UPDATE PREVIEW
    ==================================================*/

    function updatePreview() {

        if (!designPreview) return;

        designPreview.style.width = design.scale + "px";

        designPreview.style.left = `calc(50% + ${design.x}px)`;

        designPreview.style.top = `calc(50% + ${design.y}px)`;

        designPreview.style.transform =
            `translate(-50%, -50%) rotate(${design.rotation}deg)`;

    }



    /*==================================================
      IMAGE UPLOAD
    ==================================================*/

    if (uploadImage) {

        uploadImage.addEventListener("change", (event) => {

            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {

                alert("Please upload an image file.");

                return;

            }

            const reader = new FileReader();

            reader.onload = function (e) {

                uploadedImage = e.target.result;

                designPreview.src = uploadedImage;

                designPreview.style.display = "block";

                updatePreview();

            };

            reader.readAsDataURL(file);

        });

    }



    /*==================================================
      SIZE SLIDER
    ==================================================*/

    if (sizeSlider) {

        sizeSlider.addEventListener("input", function () {

            design.scale = Number(this.value);

            if (sizeValue) {

                sizeValue.textContent = this.value + " px";

            }

            updatePreview();

        });

    }



    /*==================================================
      ROTATION SLIDER
    ==================================================*/

    if (rotateSlider) {

        rotateSlider.addEventListener("input", function () {

            design.rotation = Number(this.value);

            if (rotateValue) {

                rotateValue.textContent = this.value + "°";

            }

            updatePreview();

        });

    }
        /*==================================================
      DRAG & DROP
    ==================================================*/

    function startDrag(clientX, clientY) {

        if (!uploadedImage) return;

        design.dragging = true;

        design.startX = clientX - design.x;
        design.startY = clientY - design.y;

        designPreview.style.cursor = "grabbing";

    }

    function drag(clientX, clientY) {

        if (!design.dragging) return;

        design.x = clientX - design.startX;
        design.y = clientY - design.startY;

        updatePreview();

    }

    function stopDrag() {

        design.dragging = false;

        if (designPreview) {

            designPreview.style.cursor = "grab";

        }

    }



    /*-----------------------------
      Mouse Support
    ------------------------------*/

    if (designPreview) {

        designPreview.addEventListener("mousedown", (e) => {

            e.preventDefault();

            startDrag(e.clientX, e.clientY);

        });

    }

    document.addEventListener("mousemove", (e) => {

        drag(e.clientX, e.clientY);

    });

    document.addEventListener("mouseup", () => {

        stopDrag();

    });



    /*-----------------------------
      Touch Support
    ------------------------------*/

    if (designPreview) {

        designPreview.addEventListener("touchstart", (e) => {

            if (!e.touches.length) return;

            const touch = e.touches[0];

            startDrag(touch.clientX, touch.clientY);

        }, { passive: true });

    }

    document.addEventListener("touchmove", (e) => {

        if (!design.dragging) return;

        if (!e.touches.length) return;

        const touch = e.touches[0];

        drag(touch.clientX, touch.clientY);

    }, { passive: true });

    document.addEventListener("touchend", () => {

        stopDrag();

    });
        /*==================================================
      DESIGN BOUNDARIES
    ==================================================*/

    function clampDesignPosition() {

        if (!previewWrapper || !designPreview) return;

        const wrapperRect = previewWrapper.getBoundingClientRect();

        const maxX = (wrapperRect.width / 2) - (design.scale / 2);
        const maxY = (wrapperRect.height / 2) - (design.scale / 2);

        design.x = Math.max(-maxX, Math.min(maxX, design.x));
        design.y = Math.max(-maxY, Math.min(maxY, design.y));

    }

    /*==================================================
      LOCAL STORAGE
    ==================================================*/

    function saveBuilder() {

        const builderData = {

            x: design.x,
            y: design.y,
            scale: design.scale,
            rotation: design.rotation,
            shirtColour: design.shirtColour,
            quantity: quantitySelect ? quantitySelect.value : "1",
            notes: extraNotes ? extraNotes.value : ""

        };

        localStorage.setItem(
            "manicBuilder",
            JSON.stringify(builderData)
        );

    }



    function loadBuilder() {

        const saved = localStorage.getItem("manicBuilder");

        if (!saved) return;

        try {

            const data = JSON.parse(saved);

            design.x = data.x ?? 0;
            design.y = data.y ?? 0;
            design.scale = data.scale ?? 180;
            design.rotation = data.rotation ?? 0;
            design.shirtColour = data.shirtColour ?? "white";

            if (sizeSlider)
                sizeSlider.value = design.scale;

            if (rotateSlider)
                rotateSlider.value = design.rotation;

            if (sizeValue)
                sizeValue.textContent = design.scale + " px";

            if (rotateValue)
                rotateValue.textContent = design.rotation + "°";

            if (quantitySelect)
                quantitySelect.value = data.quantity ?? "1";

            if (extraNotes)
                extraNotes.value = data.notes ?? "";

            updatePreview();

        }

        catch (error) {

            console.error("Unable to load saved builder.", error);

        }

    }



    function clearBuilderStorage() {

        localStorage.removeItem("manicBuilder");

    }

    /*==================================================
      CENTRE DESIGN
    ==================================================*/

    function centreDesign() {

        design.x = 0;
        design.y = 0;

        updatePreview();

    }



    function updatePreview() {

    if (!designPreview) return;

    clampDesignPosition();

    designPreview.style.width = design.scale + "px";

    designPreview.style.left = `calc(50% + ${design.x}px)`;

    designPreview.style.top = `calc(50% + ${design.y}px)`;

    designPreview.style.transform =
    `translate(-50%, -50%) rotate(${design.rotation}deg)`;

saveBuilder();
