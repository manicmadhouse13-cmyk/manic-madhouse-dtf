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


    const addQuoteBtn = document.getElementById("addQuote");

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



    let quoteItems = [];

try {

    quoteItems =
        JSON.parse(
            localStorage.getItem("manicQuoteBasket")
        ) || [];

}
catch(error){

    console.log(
        "Quote basket loading error",
        error
    );

    quoteItems = [];

}



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

    /*==================================================
    RESIZE SLIDER
    ==================================================*/


    if (sizeSlider) {


        sizeSlider.value = builderData.size;



        sizeSlider.addEventListener(
            "input",
            function () {


                builderData.size =
                    Number(this.value);



                if (sizeValue) {


                    sizeValue.textContent =
                        builderData.size + "px";


                }



                updatePreview();



            }
        );


    }



    /*==================================================
    ROTATION SLIDER
    ==================================================*/


    if (rotateSlider) {


        rotateSlider.value =
            builderData.rotation;



        rotateSlider.addEventListener(
            "input",
            function () {


                builderData.rotation =
                    Number(this.value);



                if (rotateValue) {


                    rotateValue.textContent =
                        builderData.rotation + "°";


                }



                updatePreview();



            }
        );


    }



    /*==================================================
    SHIRT COLOUR
    ==================================================*/


    if (shirtColour) {


        shirtColour.addEventListener(
            "change",
            function () {


                builderData.colour =
                    this.value;



                changeShirtColour();



            }
        );


    }



    function changeShirtColour() {


        if (!shirt) return;



        shirt.dataset.colour =
            builderData.colour;



        /*
        Supports either:
        - CSS classes
        - image swapping
        */


        if (
            shirt.tagName === "IMG"
        ) {


            let colourName =
                builderData.colour
                .toLowerCase();



            let newSource =
                shirt.getAttribute(
                    "data-" + colourName
                );



            if (newSource) {


                shirt.src =
                    newSource;


            }


        }


    }




    /*==================================================
    DROPDOWNS
    ==================================================*/


    if (shirtSize) {


        shirtSize.addEventListener(
            "change",
            function () {


                builderData.shirtSize =
                    this.value;


            }
        );


    }



    if (printLocation) {


        printLocation.addEventListener(
            "change",
            function () {


                builderData.location =
                    this.value;


            }
        );


    }



    if (quantity) {


        quantity.addEventListener(
            "change",
            function () {


                builderData.quantity =
                    Number(this.value);



            }
        );


    }




    /*==================================================
    DRAGGING DESIGN
    ==================================================*/


    let dragging = false;


    let startX = 0;


    let startY = 0;



    if (designPreview) {



        designPreview.addEventListener(
            "pointerdown",
            function (event) {


                dragging = true;



                designPreview.setPointerCapture(
                    event.pointerId
                );



                startX =
                    event.clientX -
                    builderData.x;



                startY =
                    event.clientY -
                    builderData.y;



            }
        );



        designPreview.addEventListener(
            "pointermove",
            function (event) {


                if (!dragging) return;



                builderData.x =
                    event.clientX -
                    startX;



                builderData.y =
                    event.clientY -
                    startY;



                updatePreview();



            }
        );



        designPreview.addEventListener(
            "pointerup",
            function () {


                dragging = false;


            }
        );


    }
    /*==================================================
    RESET BUILDER
    ==================================================*/


    if (resetBuilder) {


        resetBuilder.addEventListener(
            "click",
            function () {


                builderData = {


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



                if (designPreview) {


                    designPreview.src = "";


                    designPreview.style.display =
                        "none";


                }



                if (uploadImage) {


                    uploadImage.value = "";


                }



                if (sizeSlider) {


                    sizeSlider.value =
                        builderData.size;


                }



                if (sizeValue) {


                    sizeValue.textContent =
                        builderData.size + "px";


                }



                if (rotateSlider) {


                    rotateSlider.value =
                        builderData.rotation;


                }



                if (rotateValue) {


                    rotateValue.textContent =
                        builderData.rotation + "°";


                }



                if (quantity) {


                    quantity.value =
                        builderData.quantity;


                }



                updatePreview();



            }
        );


    }




    /*==================================================
    ADD TO QUOTE BASKET
    ==================================================*/


    if (addQuoteBtn) {

    console.log("ADD QUOTE BUTTON CONNECTED");


    addQuoteBtn.addEventListener(
        "click",
        function () {

            console.log("ADD QUOTE CLICKED");



                if (!builderData.image) {


                    alert(
                        "Please upload your artwork before adding to quote."
                    );


                    return;


                }



                builderData.notes =
                    extraNotes ?
                    extraNotes.value :
                    "";



                const quoteItem = {


                    id:
                        Date.now(),



                    image:
                        builderData.image,



                    size:
                        builderData.size,



                    rotation:
                        builderData.rotation,



                    colour:
                        builderData.colour,



                    shirtSize:
                        builderData.shirtSize,



                    location:
                        builderData.location,



                    quantity:
                        builderData.quantity,



                    notes:
                        builderData.notes


                };



                quoteItems.push(
                    quoteItem
                );



                saveQuoteBasket();



                updateQuoteBasketDisplay();



                alert(
                    "Design added to quote."
                );


            }
        );


    }




    /*==================================================
    SAVE QUOTE BASKET
    ==================================================*/


    function saveQuoteBasket() {


    localStorage.setItem(
        "manicQuoteBasket",
        JSON.stringify(quoteItems)
    );


    console.log(
        "Saved quote basket:",
        quoteItems
    );


    }




    /*==================================================
    DISPLAY QUOTE BASKET
    ==================================================*/


    function updateQuoteBasketDisplay() {


        if (!quoteBasket) return;



        quoteBasket.innerHTML = "";



        if (quoteItems.length === 0) {


            quoteBasket.innerHTML =
                "<p>No designs added yet.</p>";



            return;


        }



        quoteItems.forEach(
            function(item){



                const card =
                    document.createElement(
                        "div"
                    );



                card.className =
                    "quote-item";



                card.innerHTML = `


                    <img 
                    src="${item.image}"
                    class="quote-image"
                    >


                    <div class="quote-details">


                    <strong>
                    Custom DTF Design
                    </strong>


                    <span>
                    Colour: ${item.colour}
                    </span>


                    <span>
                    Size: ${item.shirtSize}
                    </span>


                    <span>
                    Location: ${item.location}
                    </span>


                    <span>
                    Quantity: ${item.quantity}
                    </span>


                    <span>
                    Notes: ${item.notes}
                    </span>


                    </div>



                    <button
                    class="remove-quote"
                    data-id="${item.id}">
                    Remove
                    </button>


                `;



                quoteBasket.appendChild(
                    card
                );


            }
        );



        attachRemoveButtons();


    }




    /*==================================================
    REMOVE QUOTE ITEMS
    ==================================================*/


    function attachRemoveButtons(){


        const buttons =
            document.querySelectorAll(
                ".remove-quote"
            );



        buttons.forEach(
            function(button){



                button.addEventListener(
                    "click",
                    function(){


                        const id =
                            Number(
                                this.dataset.id
                            );



                        quoteItems =
                            quoteItems.filter(
                                function(item){


                                    return item.id !== id;


                                }
                            );



                        saveQuoteBasket();


                        updateQuoteBasketDisplay();


                    }
                );



            }
        );


    }
    /*==================================================
    LOAD EXISTING QUOTE BASKET
    ==================================================*/


    updateQuoteBasketDisplay();



    /*==================================================
    INITIAL VALUES
    ==================================================*/


    if (sizeValue) {


        sizeValue.textContent =
            builderData.size + "px";


    }



    if (rotateValue) {


        rotateValue.textContent =
            builderData.rotation + "°";


    }



    if (designPreview) {


        designPreview.style.position =
            "absolute";


        designPreview.style.cursor =
            "move";


        designPreview.style.userSelect =
            "none";


        designPreview.style.display =
            "none";


    }




    /*==================================================
    MOBILE TOUCH SUPPORT
    ==================================================*/


    if (designPreview) {


        designPreview.addEventListener(
            "touchmove",
            function(event){


                if (!dragging) return;



                event.preventDefault();



            },
            {
                passive:false
            }
        );


    }





    /*==================================================
    EXPOSE FUNCTIONS
    FOR DEBUGGING / OTHER FILES
    ==================================================*/


    window.ManicMadhouseBuilder = {


        getQuoteBasket:
        function(){


            return quoteItems;


        },


        clearQuoteBasket:
        function(){


            quoteItems = [];


            saveQuoteBasket();


            updateQuoteBasketDisplay();


        },


        refreshQuoteBasket:
        function(){


            updateQuoteBasketDisplay();


        }


    };



    console.log(
        "Manic Madhouse Design Builder V10 Ready"
    );


});
