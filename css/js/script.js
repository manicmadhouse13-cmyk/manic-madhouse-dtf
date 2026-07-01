const upload = document.getElementById("uploadImage");
const preview = document.getElementById("designPreview");

const sizeSlider = document.getElementById("sizeSlider");
const rotateSlider = document.getElementById("rotateSlider");

upload.addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

preview.src = e.target.result;
preview.style.display = "block";

}

reader.readAsDataURL(file);

});

sizeSlider.addEventListener("input",function(){

preview.style.width = this.value + "px";

});

rotateSlider.addEventListener("input",function(){

preview.style.transform =
`translate(-50%,-50%) rotate(${this.value}deg)`;

});
