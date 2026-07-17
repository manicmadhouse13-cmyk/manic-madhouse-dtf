
/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 9.0 CLEAN REBUILD
==================================================*/


document.addEventListener("DOMContentLoaded", () => {


/*==================================================
ELEMENT REFERENCES
==================================================*/


// Preview

const shirt =
document.getElementById("shirt");

const designPreview =
document.getElementById("designPreview");

const previewWrapper =
document.querySelector(".preview-wrapper");


// Upload

const uploadImage =
document.getElementById("uploadImage");


// Sliders

const sizeSlider =
document.getElementById("sizeSlider");

const rotateSlider =
document.getElementById("rotateSlider");


// Slider values

const sizeValue =
document.getElementById("sizeValue");

const rotateValue =
document.getElementById("rotateValue");


// Options

const quantitySelect =
document.getElementById("quantity");

const extraNotes =
document.getElementById("extraNotes");

const shirtColourSelect =
document.getElementById("shirtColour");


// Buttons

const addQuoteBtn =
document.getElementById("addQuote");

const resetBtn =
document.getElementById("resetBuilder");


// Quote Basket

const quoteBasket =
document.getElementById("quoteBasket");



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

    shirtColour: "black"

};



/*==================================================
UPDATE PREVIEW
==================================================*/


function updatePreview() {


    if (!designPreview) return;


    designPreview.style.width =
    design.scale + "px";


    designPreview.style.left =
    `calc(50% + ${design.x}px)`;


    designPreview.style.top =
    `calc(50% + ${design.y}px)`;


    designPreview.style.transform =
    `translate(-50%, -50%) rotate(${design.rotation}deg)`;


}



/*==================================================
SAVE BUILDER
==================================================*/


function saveBuilder() {


    const data = {


        x: design.x,

        y: design.y,

        scale: design.scale,

        rotation: design.rotation,

        shirtColour: design.shirtColour,

        quantity:
        quantitySelect ? quantitySelect.value : "1",

        notes:
        extraNotes ? extraNotes.value : ""


    };


    localStorage.setItem(
        "manicBuilder",
        JSON.stringify(data)
    );


}
/*==================================================
IMAGE UPLOAD
==================================================*/


if (uploadImage) {


    uploadImage.addEventListener(
        "change",
        function(event) {


            const file =
            event.target.files[0];


            if (!file) return;


            if (!file.type.startsWith("image/")) {


                alert(
                    "Please upload an image file."
                );


                return;

            }



            const reader =
            new FileReader();



            reader.onload =
            function(e) {


                uploadedImage =
                e.target.result;


                designPreview.src =
                uploadedImage;


                designPreview.style.display =
                "block";


                updatePreview();


            };



            reader.readAsDataURL(file);


        }

    );


}





/*==================================================
SIZE SLIDER
==================================================*/


if (sizeSlider) {


    sizeSlider.addEventListener(
        "input",
        function() {


            design.scale =
            Number(this.value);



            if (sizeValue) {


                sizeValue.textContent =
                this.value + " px";


            }



            updatePreview();


        }

    );


}





/*==================================================
ROTATION SLIDER
==================================================*/


if (rotateSlider) {


    rotateSlider.addEventListener(
        "input",
        function() {


            design.rotation =
            Number(this.value);



            if (rotateValue) {


                rotateValue.textContent =
                this.value + "°";


            }



            updatePreview();


        }

    );


}

