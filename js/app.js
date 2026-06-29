// =====================================
// MANIC MADHOUSE DTF DESIGNS
// APP.JS
// =====================================

// Loading Screen
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    },1200);

});

// Sticky Navigation

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>60){

navbar.style.padding="10px 0";

navbar.style.background="rgba(8,8,12,.95)";

}else{

navbar.style.padding="18px 0";

navbar.style.background="rgba(8,8,12,.65)";

}

});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// Reveal Animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});

// Floating Glow Animation

let glow=document.createElement("div");

glow.className="cursorGlow";

document.body.appendChild(glow);

document.addEventListener("mousemove",e=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

// Counter Animation

document.querySelectorAll(".counter").forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.dataset.target;

const c=+counter.innerText;

const increment=target/100;

if(c<target){

counter.innerText=Math.ceil(c+increment);

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

});
