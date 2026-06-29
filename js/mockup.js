const upload=document.getElementById("upload");

const design=document.getElementById("design");

const shirt=document.getElementById("shirt");

const scale=document.getElementById("scale");

const reset=document.getElementById("resetBtn");

const colour=document.getElementById("shirtColor");

let dragging=false;

let offsetX=0;

let offsetY=0;

upload.onchange=e=>{

const reader=new FileReader();

reader.onload=function(event){

design.src=event.target.result;

design.style.display="block";

};

reader.readAsDataURL(e.target.files[0]);

};

scale.oninput=()=>{

design.style.width=scale.value+"px";

};

reset.onclick=()=>{

design.style.left="50%";

design.style.top="50%";

design.style.transform="translate(-50%,-50%)";

};

colour.onchange=()=>{

shirt.src="images/mockups/"+colour.value+"-shirt.png";

};

design.addEventListener("mousedown",e=>{

dragging=true;

offsetX=e.offsetX;

offsetY=e.offsetY;

});

document.addEventListener("mouseup",()=>{

dragging=false;

});

document.addEventListener("mousemove",e=>{

if(!dragging) return;

const rect=document.getElementById("mockupArea").getBoundingClientRect();

design.style.left=(e.clientX-rect.left-offsetX)+"px";

design.style.top=(e.clientY-rect.top-offsetY)+"px";

design.style.transform="none";

});
