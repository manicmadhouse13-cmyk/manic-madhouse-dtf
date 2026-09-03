/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 8.0
CLEAN CORE ENGINE
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==================================================
    ELEMENTS
    ==================================================*/

    const uploadImage = document.getElementById("uploadImage");
    const designPreview = document.getElementById("designPreview");

    // Supports either shirtImage or shirt
    const shirtImage =
        document.getElementById("shirtImage") ||
        document.getElementById("shirt");

    const shirtColour = document.getElementById("shirtColour");

    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");

    const sizeValue = document.getElementById("sizeValue");
    const rotateValue = document.getElementById("rotateValue");

    // Exit if the Design Builder isn't on this page
    if (!designPreview) {
        return;
    }


    /*==================================================
    DESIGN STATE
    ==================================================*/

    const design = {

        image: null,

        x: 50,
        y: 42,

        size: sizeSlider
            ? Number(sizeSlider.value)
            : 180,

        rotation: rotateSlider
            ? Number(rotateSlider.value)
            : 0

    };


    /*==================================================
    UPDATE VALUE LABELS
    ==================================================*/

    function updateValueLabels() {

        if (sizeValue) {
            sizeValue.textContent = design.size;
        }

        if (rotateValue) {
            rotateValue.textContent = design.rotation + "°";
        }

    }


    /*==================================================
    APPLY DESIGN
    ==================================================*/

    function applyDesign() {

        if (!design.image) {

            designPreview.style.display = "none";

            return;
        }


        designPreview.style.display = "block";

        designPreview.src = design.image;

        designPreview.style.position = "absolute";

        designPreview.style.left = design.x + "%";

        designPreview.style.top = design.y + "%";

        designPreview.style.width = design.size + "px";

        designPreview.style.height = "auto";

        designPreview.style.transform =
            "translate(-50%, -50%) rotate(" +
            design.rotation +
            "deg)";

        designPreview.style.cursor = dragging
            ? "grabbing"
            : "move";

    }


    /*==================================================
    IMAGE UPLOAD
    ==================================================*/

    if (uploadImage) {

        uploadImage.addEventListener("change", function (event) {

            const file = event.target.files[0];

            if (!file) {
                return;
            }


            if (!file.type.startsWith("image/")) {

                alert("Please upload an image.");

                uploadImage.value = "";

                return;
            }


            const reader = new FileReader();


            reader.onload = function (e) {

                design.image = e.target.result;

                applyDesign();

            };


            reader.readAsDataURL(file);

        });

    }


    /*==================================================
    SHIRT COLOUR
    ==================================================*/

    if (shirtColour && shirtImage) {

        shirtColour.addEventListener("change", function () {

            const shirts = {

                black: "shirt-black.png",
                white: "shirt-white.png",
                grey: "shirt-grey.png",
                navy: "shirt-navy.png",
                red: "shirt-red.png"

            };


            if (shirts[this.value]) {

                shirtImage.src = shirts[this.value];

            }

        });

    }


    /*==================================================
    SIZE SLIDER
    ==================================================*/

    if (sizeSlider) {

        sizeSlider.addEventListener("input", function () {

            design.size = Number(this.value);

            updateValueLabels();

            applyDesign();

        });

    }


    /*==================================================
    ROTATION SLIDER
    ==================================================*/

    if (rotateSlider) {

        rotateSlider.addEventListener("input", function () {

            design.rotation = Number(this.value);

            updateValueLabels();

            applyDesign();

        });

    }


    /*==================================================
    DRAG + TOUCH
    ==================================================*/

    let dragging = false;


    function getPointerPosition(event) {

        if (
            event.touches &&
            event.touches.length > 0
        ) {

            return {

                x: event.touches[0].clientX,
                y: event.touches[0].clientY

            };

        }


        return {

            x: event.clientX,
            y: event.clientY

        };

    }


    function startDrag(event) {

        if (!design.image) {
            return;
        }


        dragging = true;

        designPreview.style.cursor = "grabbing";

        event.preventDefault();

    }


    function drag(event) {

        if (!dragging) {
            return;
        }


        const container =
            designPreview.parentElement;

        if (!container) {
            return;
        }


        const rect =
            container.getBoundingClientRect();

        const pointer =
            getPointerPosition(event);


        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {
            return;
        }


        design.x =
            ((pointer.x - rect.left) / rect.width) * 100;


        design.y =
            ((pointer.y - rect.top) / rect.height) * 100;


        // Keep artwork inside the shirt preview

        design.x =
            Math.max(
                5,
                Math.min(95, design.x)
            );


        design.y =
            Math.max(
                5,
                Math.min(95, design.y)
            );


        applyDesign();

        event.preventDefault();

    }


    function stopDrag() {

        if (!dragging) {
            return;
        }


        dragging = false;

        designPreview.style.cursor = "move";

    }


    /*==================================================
    MOUSE DRAG
    ==================================================*/

    designPreview.addEventListener(
        "mousedown",
        startDrag
    );


    document.addEventListener(
        "mousemove",
        drag
    );


    document.addEventListener(
        "mouseup",
        stopDrag
    );


    /*==================================================
    TOUCH DRAG
    ==================================================*/

    designPreview.addEventListener(
        "touchstart",
        startDrag,
        {
            passive: false
        }
    );


    document.addEventListener(
        "touchmove",
        drag,
        {
            passive: false
        }
    );


    document.addEventListener(
        "touchend",
        stopDrag
    );


    /*==================================================
    INITIAL VALUES
    ==================================================*/

    if (sizeSlider) {

        design.size =
            Number(sizeSlider.value);

    }


    if (rotateSlider) {

        design.rotation =
            Number(rotateSlider.value);

    }


    updateValueLabels();

    applyDesign();


    console.log(
        "Manic Madhouse Design Builder 8.0 loaded successfully"
    );

});
