/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 7.0
CHUNK 1 - CORE ENGINE
==================================================*/

function initialiseDesignBuilder() {

    /*==============================
    ELEMENTS
    ==============================*/

    const uploadImage = document.getElementById("uploadImage");
    const designPreview = document.getElementById("designPreview");
    const shirtImage = document.getElementById("shirtImage");
    const shirtColour = document.getElementById("shirtColour");
    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");

    // Exit if this page doesn't contain the builder
    if (!designPreview) return;

    /*==============================
    DESIGN STATE
    ==============================*/

    const design = {

        image: null,

        x: 50,
        y: 38,

        size: 180,

        rotation: 0,

        shirt: "white"

    };

    /*==============================
    APPLY DESIGN
    ==============================*/

    function applyDesign() {

        designPreview.style.display = design.image
            ? "block"
            : "none";

        if (!design.image) return;

        designPreview.src = design.image;

        designPreview.style.position = "absolute";

        designPreview.style.left = design.x + "%";
        designPreview.style.top = design.y + "%";

        designPreview.style.width = design.size + "px";

        designPreview.style.transform =
            `translate(-50%, -50%) rotate(${design.rotation}deg)`;

    }

    /*==============================
    IMAGE UPLOAD
    ==============================*/

    if (uploadImage) {

        uploadImage.addEventListener("change", event => {

            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {

                alert("Please upload an image.");

                return;

            }

            const reader = new FileReader();

            reader.onload = e => {

                design.image = e.target.result;

                applyDesign();

            };

            reader.readAsDataURL(file);

        });

    }

    /*==============================
    SHIRT COLOUR
    ==============================*/

    if (shirtColour && shirtImage) {

        shirtColour.addEventListener("change", () => {

            design.shirt = shirtColour.value;

            shirtImage.src =
                `images/shirts/${design.shirt}.png`;

        });

    }

    /*==============================
    SLIDERS
    ==============================*/

    if (sizeSlider) {

        sizeSlider.addEventListener("input", () => {

            design.size = Number(sizeSlider.value);

            applyDesign();

        });

    }

    if (rotateSlider) {

        rotateSlider.addEventListener("input", () => {

            design.rotation = Number(rotateSlider.value);

            applyDesign();

        });

    }

    /*==============================
    INITIAL DRAW
    ==============================*/

    applyDesign();

}
    /*==============================
    DRAG & TOUCH SUPPORT
    ==============================*/

    let dragging = false;

    function getPointerPosition(event) {

        if (event.touches && event.touches.length) {

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

        if (!design.image) return;

        dragging = true;

        designPreview.style.cursor = "grabbing";

        event.preventDefault();

    }

    function stopDrag() {

        dragging = false;

        designPreview.style.cursor = "move";

    }

    function drag(event) {

        if (!dragging) return;

        const previewArea = designPreview.parentElement;

        const rect = previewArea.getBoundingClientRect();

        const pointer = getPointerPosition(event);

        design.x =
            ((pointer.x - rect.left) / rect.width) * 100;

        design.y =
            ((pointer.y - rect.top) / rect.height) * 100;

        design.x = Math.max(5, Math.min(95, design.x));
        design.y = Math.max(5, Math.min(95, design.y));

        applyDesign();

        event.preventDefault();

    }

    designPreview.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    designPreview.addEventListener(
        "touchstart",
        startDrag,
        { passive: false }
    );

    document.addEventListener(
        "touchmove",
        drag,
        { passive: false }
    );

    document.addEventListener(
        "touchend",
        stopDrag
    );
