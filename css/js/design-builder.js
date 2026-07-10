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
/*==================================================
MANIC MADHOUSE DESIGN BUILDER
CHUNK 3
RESIZE + ROTATE CONTROLS
==================================================*/

const designImage = document.getElementById("designPreview");
const sizeControl = document.getElementById("sizeSlider");
const rotateControl = document.getElementById("rotateSlider");

let designSize = 180;
let designAngle = 0;


/* UPDATE DESIGN */

function updateDesign(){

    if(!designImage) return;

    designImage.style.width = designSize + "px";

    designImage.style.transform =
        `translate(-50%, -50%) rotate(${designAngle}deg)`;

}


/* SIZE SLIDER */

if(sizeControl){

    sizeControl.addEventListener("input", function(){

        designSize = this.value;

        updateDesign();

    });

}


/* ROTATION SLIDER */

if(rotateControl){

    rotateControl.addEventListener("input", function(){

        designAngle = this.value;

        updateDesign();

    });

}
/*==================================================
MANIC MADHOUSE DESIGN BUILDER
CHUNK 4
DRAG & DROP POSITIONING
==================================================*/

if(designImage){

    let dragging = false;
    let startX = 0;
    let startY = 0;


    function startDrag(e){

        if(designImage.style.display === "none") return;

        dragging = true;

        const rect = designImage.getBoundingClientRect();

        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;


        startX = x - rect.left;
        startY = y - rect.top;


        designImage.style.cursor = "grabbing";

    }



    function moveDrag(e){

        if(!dragging) return;

        e.preventDefault();


        const container = designImage.parentElement;

        const containerRect = container.getBoundingClientRect();


        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;


        const left = x - containerRect.left - startX;
        const top = y - containerRect.top - startY;


        designImage.style.left = left + "px";
        designImage.style.top = top + "px";

        designImage.style.transform =
            `translate(0,0) rotate(${designAngle}deg)`;

    }



    function stopDrag(){

        dragging = false;

        designImage.style.cursor = "move";

    }



    designImage.addEventListener(
        "mousedown",
        startDrag
    );


    document.addEventListener(
        "mousemove",
        moveDrag
    );


    document.addEventListener(
        "mouseup",
        stopDrag
    );



    designImage.addEventListener(
        "touchstart",
        startDrag,
        {passive:false}
    );


    document.addEventListener(
        "touchmove",
        moveDrag,
        {passive:false}
    );


    document.addEventListener(
        "touchend",
        stopDrag
    );


}
