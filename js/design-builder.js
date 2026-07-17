
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
/*==================================================
DRAG SYSTEM
==================================================*/


function startDrag(x, y) {


    if (!uploadedImage) return;


    design.dragging = true;


    design.startX =
    x - design.x;


    design.startY =
    y - design.y;



}




function dragMove(x, y) {


    if (!design.dragging) return;



    design.x =
    x - design.startX;


    design.y =
    y - design.startY;



    updatePreview();



}




function stopDrag() {


    design.dragging = false;


}





/*==================================================
MOUSE SUPPORT
==================================================*/


if (designPreview) {


    designPreview.addEventListener(
        "mousedown",
        function(e) {


            e.preventDefault();


            startDrag(
                e.clientX,
                e.clientY
            );


        }

    );


}



document.addEventListener(
    "mousemove",
    function(e) {


        dragMove(
            e.clientX,
            e.clientY
        );


    }

);



document.addEventListener(
    "mouseup",
    function() {


        stopDrag();


    }

);






/*==================================================
TOUCH SUPPORT
==================================================*/


if (designPreview) {


    designPreview.addEventListener(
        "touchstart",
        function(e) {


            if (!e.touches.length) return;



            const touch =
            e.touches[0];


            startDrag(
                touch.clientX,
                touch.clientY
            );


        },
        {passive:true}

    );


}



document.addEventListener(
    "touchmove",
    function(e) {


        if (!design.dragging) return;


        if (!e.touches.length) return;



        const touch =
        e.touches[0];



        dragMove(
            touch.clientX,
            touch.clientY
        );


    },
    {passive:true}

);



document.addEventListener(
    "touchend",
    function() {


        stopDrag();


    }

);
/*==================================================
QUOTE BASKET
==================================================*/


let quoteItems =
JSON.parse(
    localStorage.getItem("manicQuoteBasket")
) || [];




function saveQuoteBasket() {


    localStorage.setItem(
        "manicQuoteBasket",
        JSON.stringify(quoteItems)
    );


}





function createQuoteItem() {


    return {


        id: Date.now(),


        image: uploadedImage,


        size: design.scale,


        rotation: design.rotation,


        position: {

            x: design.x,

            y: design.y

        },


        quantity:
        quantitySelect
        ? quantitySelect.value
        : "1",


        notes:
        extraNotes
        ? extraNotes.value
        : "",


        shirtColour:
        design.shirtColour,


        dateAdded:
        new Date().toISOString()


    };


}





function addToQuoteBasket() {


    if (!uploadedImage) {


        alert(
            "Please upload your artwork before adding to your quote."
        );


        return;


    }



    quoteItems.push(
        createQuoteItem()
    );



    saveQuoteBasket();


    updateQuoteBasketDisplay();



    alert(
        "Design added to quote!"
    );


}





function removeQuoteItem(id) {


    quoteItems =
    quoteItems.filter(
        item => item.id !== id
    );


    saveQuoteBasket();


    updateQuoteBasketDisplay();


}





function updateQuoteBasketDisplay() {


    if (!quoteBasket) return;



    quoteBasket.innerHTML = "";



    if (quoteItems.length === 0) {


        quoteBasket.innerHTML =
        "<p>No designs added yet.</p>";


        return;


    }




    quoteItems.forEach(
        function(item) {



            const div =
            document.createElement("div");



            div.className =
            "quote-item";



            div.innerHTML = `

                <img src="${item.image}"
                alt="Design Preview">


                <div>

                    <strong>
                    Custom DTF Design
                    </strong>


                    <span>
                    Quantity: ${item.quantity}
                    </span>


                    <span>
                    Size: ${item.size}px
                    </span>


                </div>


                <button
                class="remove-quote"
                data-id="${item.id}">
                Remove
                </button>

            `;



            quoteBasket.appendChild(div);



        }

    );





    document
    .querySelectorAll(".remove-quote")
    .forEach(
        button => {


            button.addEventListener(
                "click",
                function() {


                    removeQuoteItem(
                        Number(
                            this.dataset.id
                        )
                    );


                }

            );


        }

    );



}





if (addQuoteBtn) {


    addQuoteBtn.addEventListener(
        "click",
        addToQuoteBasket
    );


}
