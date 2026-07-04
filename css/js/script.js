// ===============================
// DESIGN STUDIO
// ===============================

const uploadImage = document.getElementById("uploadImage");
const designPreview = document.getElementById("designPreview");
const shirtImage = document.getElementById("shirtImage");

const sizeSlider = document.getElementById("sizeSlider");
const rotateSlider = document.getElementById("rotateSlider");
const shirtColour = document.getElementById("shirtColour");

// Upload artwork
if(uploadImage){

uploadImage.addEventListener("change", function(e){

const reader = new FileReader();

reader.onload = function(){

designPreview.src = reader.result;
designPreview.style.display = "block";

}

reader.readAsDataURL(e.target.files[0]);

});

}

// Resize
if(sizeSlider){

sizeSlider.addEventListener("input", function(){

designPreview.style.width = this.value + "px";

});

}

// Rotate
if(rotateSlider){

rotateSlider.addEventListener("input", function(){

designPreview.style.transform =
`translate(-50%,-50%) rotate(${this.value}deg)`;

});

}

// Shirt colours
if(shirtColour){

shirtColour.addEventListener("change", function(){

shirtImage.src =
"images/shirt-" + this.value + ".png";

});

}
