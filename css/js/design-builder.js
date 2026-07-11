/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 7.1
==================================================*/

function initialiseDesignBuilder() {

    /*==============================
    ELEMENTS
    ==============================*/

    const uploadImage = document.getElementById("uploadImage");
    const designPreview = document.getElementById("designPreview");
    const shirt = document.getElementById("shirt");

    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");
    const shirtColour = document.getElementById("shirtColour");

    // Not on builder page
    if (!uploadImage || !designPreview || !shirt) {
        return;
    }

    /*==============================
    DESIGN STATE
    ==============================*/

    const design = {

        image: "",

        x: 50,

        y: 38,

        size: 180,

        rotation: 0

    };

    /*==============================
    DRAW DESIGN
    ==============================*/

    function drawDesign() {

        if (!design.image) {

            designPreview.style.display = "none";

            return;

        }

        designPreview.src = design.image;

        designPreview.style.display = "block";

        designPreview.style.position = "absolute";

        designPreview.style.left = design.x + "%";

        designPreview.style.top = design.y + "%";

        designPreview.style.width = design.size + "px";

        designPreview.style.transform =
            `translate(-50%, -50%) rotate(${design.rotation}deg)`;

        designPreview.style.zIndex = "10";

        designPreview.style.pointerEvents = "auto";

    }

