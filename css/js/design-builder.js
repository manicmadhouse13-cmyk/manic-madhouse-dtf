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
