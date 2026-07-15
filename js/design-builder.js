/*==================================================
MANIC MADHOUSE DTF DESIGNS
DESIGN BUILDER
VERSION 8.1
CHUNK 1
==================================================*/


document.addEventListener("DOMContentLoaded", function () {


    const shirt = document.getElementById("shirt");
    const designPreview = document.getElementById("designPreview");
    const uploadImage = document.getElementById("uploadImage");

    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");


    // Stop if builder is not on page

    if (!shirt || !designPreview || !uploadImage) {

        return;

    }


    const design = {

        image: "",

        x: 50,

        y: 42,

        size: 80,

        rotation: 0

    };


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


        designPreview.style.width =
            design.size + "px";


        designPreview.style.transform =
            `translate(-50%, -50%) rotate(${design.rotation}deg)`;


        designPreview.style.zIndex = "20";


    }



    /*==============================
    UPLOAD ARTWORK
    ==============================*/


    uploadImage.addEventListener("change", function (event) {


        const file = event.target.files[0];


        if (!file) {

            return;

        }


        const reader = new FileReader();


        reader.onload = function(e) {


            design.image = e.target.result;


            design.x = 50;

            design.y = 42;

            design.size = 80;

            design.rotation = 0;


            if (sizeSlider) {

                sizeSlider.value = 80;

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


});
