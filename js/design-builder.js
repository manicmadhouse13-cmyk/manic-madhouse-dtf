/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 10.0

FEATURES:
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


    console.log("Manic Madhouse Design Builder V10 Loaded");


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


    const addQuoteBtn = document.getElementById("addQuoteBtn");

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


        colour: "Black",


        shirtSize: "M",


        location: "Front",


        quantity: 1,


        notes: ""

    };



    let quoteItems = JSON.parse(
        localStorage.getItem("manicQuoteBasket")
    ) || [];



    /*==================================================
    IMAGE UPLOAD
    ==================================================*/


    if (uploadImage) {


        uploadImage.addEventListener(
            "change",
            function (event) {


                const file = event.target.files[0];


                if (!file) return;



                const reader = new FileReader();



                reader.onload = function (e) {


                    builderData.image = e.target.result;


                    if (designPreview) {


                        designPreview.src =
                            builderData.image;


                        designPreview.style.display =
                            "block";


                    }


                    updatePreview();


                };



                reader.readAsDataURL(file);



            }
        );


    }



    /*==================================================
    UPDATE DESIGN PREVIEW
    ==================================================*/


    function updatePreview() {


        if (!designPreview) return;



        designPreview.style.width =
            builderData.size + "px";



        designPreview.style.left =
            "calc(50% + " +
            builderData.x +
            "px)";



        designPreview.style.top =
            "calc(50% + " +
            builderData.y +
            "px)";



        designPreview.style.transform =
            "translate(-50%, -50%) rotate(" +
            builderData.rotation +
            "deg)";


    }

