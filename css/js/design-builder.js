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

    /*==============================
    IMAGE UPLOAD
    ==============================*/

    uploadImage.addEventListener("change", function (event) {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please upload an image file.");

            return;

        }

        const reader = new FileReader();

        reader.onload = function (e) {

            design.image = e.target.result;
            alert("Image loaded successfully");

            design.x = 50;
            design.y = 38;
            design.size = 180;
            design.rotation = 0;

            if (sizeSlider) {
                sizeSlider.value = 180;
            }

            if (rotateSlider) {
                rotateSlider.value = 0;
            }

            drawDesign();

        };

        reader.readAsDataURL(file);

    });

    /*==============================
    SIZE SLIDER
    ==============================*/

    if (sizeSlider) {

        sizeSlider.addEventListener("input", function () {

            design.size = Number(this.value);

            drawDesign();

        });

    }

    /*==============================
    ROTATION SLIDER
    ==============================*/

    if (rotateSlider) {

        rotateSlider.addEventListener("input", function () {

            design.rotation = Number(this.value);

            drawDesign();

        });

    }
    /*==============================
    DRAG SUPPORT
    ==============================*/

    let dragging = false;

    function pointerPosition(event) {

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

        const rect = shirt.parentElement.getBoundingClientRect();

        const pointer = pointerPosition(event);

        design.x =
            ((pointer.x - rect.left) / rect.width) * 100;

        design.y =
            ((pointer.y - rect.top) / rect.height) * 100;

        design.x = Math.max(5, Math.min(95, design.x));
        design.y = Math.max(5, Math.min(95, design.y));

        drawDesign();

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
    /*==============================
    SHIRT COLOUR (READY FOR FUTURE)
    ==============================*/

    if (shirtColour) {

        shirtColour.addEventListener("change", function () {

            shirt.src =
                "images/shirts/" + this.value + ".png";

        });

    }

    /*==============================
    INITIAL DRAW
    ==============================*/

    drawDesign();

}

/*==================================================
END OF DESIGN BUILDER
==================================================*/
