/* =========================
   MANIC MADHOUSE v4.0 SCRIPT
   CLEAN + FIXED + MODULAR
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       QUOTE BASKET SYSTEM
    ========================== */

    let quote = JSON.parse(localStorage.getItem("quoteList")) || [];

    const quoteListEl = document.getElementById("quoteList");

    function saveQuote() {
        localStorage.setItem("quoteList", JSON.stringify(quote));
    }

    function renderQuote() {

        if (!quoteListEl) return;

        if (quote.length === 0) {
            quoteListEl.innerHTML = "<p>No designs selected yet.</p>";
            return;
        }

        quoteListEl.innerHTML = "";

        quote.forEach((item, index) => {

            const div = document.createElement("div");
            div.classList.add("quote-item");

            div.innerHTML = `
                <p>${item}</p>
                <button class="remove-quote" data-index="${index}">
                    Remove
                </button>
            `;

            quoteListEl.appendChild(div);
        });
    }

    function addToQuote(item) {

        quote.push(item);
        saveQuote();
        renderQuote();
    }

    document.querySelectorAll(".quote-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const name = btn.dataset.name || "Custom Design";
            addToQuote(name);

        });

    });

    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("remove-quote")) {

            const index = e.target.dataset.index;

            quote.splice(index, 1);
            saveQuote();
            renderQuote();

        }

    });

    renderQuote();

    /* =========================
       SEARCH FILTER (SHOP PAGE)
    ========================== */

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            document.querySelectorAll(".product-card, .collection-card").forEach(card => {

                const text = card.innerText.toLowerCase();

                card.style.display = text.includes(value) ? "block" : "none";

            });

        });

    }

    /* =========================
       CATEGORY FILTER BUTTONS
    ========================== */

    const categoryButtons = document.querySelectorAll(".category-buttons button");

    categoryButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.textContent.toLowerCase();

            document.querySelectorAll(".product-card").forEach(card => {

                const text = card.innerText.toLowerCase();

                if (category === "all") {
                    card.style.display = "block";
                } else {
                    card.style.display = text.includes(category) ? "block" : "none";
                }

            });

        });

    });

    /* =========================
       DESIGN BUILDER SYSTEM
    ========================== */

    const uploadImage = document.getElementById("uploadImage");
    const designPreview = document.getElementById("designPreview");
    const sizeSlider = document.getElementById("sizeSlider");
    const rotateSlider = document.getElementById("rotateSlider");

    let currentImage = null;

    if (uploadImage) {

        uploadImage.addEventListener("change", (e) => {

            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (event) {

                currentImage = event.target.result;

                designPreview.src = currentImage;

                designPreview.style.position = "absolute";
                designPreview.style.top = "50%";
                designPreview.style.left = "50%";
                designPreview.style.transform = "translate(-50%, -50%)";

            };

            reader.readAsDataURL(file);

        });

    }

    function updateDesignTransform() {

        if (!designPreview) return;

        const size = sizeSlider ? sizeSlider.value : 180;
        const rotate = rotateSlider ? rotateSlider.value : 0;

        designPreview.style.width = size + "px";
        designPreview.style.transform =
            `translate(-50%, -50%) rotate(${rotate}deg)`;

    }

    if (sizeSlider) sizeSlider.addEventListener("input", updateDesignTransform);
    if (rotateSlider) rotateSlider.addEventListener("input", updateDesignTransform);

    /* =========================
       BACK TO TOP BUTTON
    ========================== */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});
/*==================================================
GLOBAL WEBSITE FUNCTIONS
==================================================*/

// Back To Top Button

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// Active Navigation

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});

// Fade In Cards

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".product-card,.collection-card,.why-card,.review-card,.process-card,.faq-item").forEach(card => {

    observer.observe(card);

});
/*==================================================
DESIGN BUILDER
UPLOAD & LIVE PREVIEW
==================================================*/

const uploadInput = document.getElementById("designUpload");
const designPreview = document.getElementById("designPreview");

if (uploadInput && designPreview) {

    uploadInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

            designPreview.src = e.target.result;
            designPreview.style.display = "block";

            // Reset default position
            designPreview.style.left = "50%";
            designPreview.style.top = "38%";
            designPreview.style.width = "180px";
            designPreview.style.transform = "translate(-50%,-50%) rotate(0deg)";

        };

        reader.readAsDataURL(file);

    });

}
/*==================================================
DESIGN BUILDER
DRAG & DROP
==================================================*/

if (designPreview) {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    function startDrag(e) {

        if (designPreview.style.display === "none") return;

        isDragging = true;

        const rect = designPreview.getBoundingClientRect();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        designPreview.style.cursor = "grabbing";
    }

    function drag(e) {

        if (!isDragging) return;

        e.preventDefault();

        const parent = designPreview.parentElement;
        const parentRect = parent.getBoundingClientRect();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const left = clientX - parentRect.left - offsetX;
        const top = clientY - parentRect.top - offsetY;

        designPreview.style.left = left + "px";
        designPreview.style.top = top + "px";
        designPreview.style.transform = "rotate(0deg)";
    }

    function stopDrag() {

        isDragging = false;
        designPreview.style.cursor = "move";
    }

    designPreview.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    designPreview.addEventListener("touchstart", startDrag, {
        passive: false
    });

    document.addEventListener("touchmove", drag, {
        passive: false
    });

    document.addEventListener("touchend", stopDrag);

}
/*==================================================
DESIGN BUILDER
RESIZE & ROTATE
==================================================*/

const sizeSlider = document.getElementById("sizeSlider");
const rotateSlider = document.getElementById("rotateSlider");

let designScale = 180;
let designRotation = 0;

function updateDesignTransform() {

    if (!designPreview) return;

    designPreview.style.width = designScale + "px";
    designPreview.style.transform = `rotate(${designRotation}deg)`;

}

// Resize

if (sizeSlider) {

    sizeSlider.addEventListener("input", function () {

        designScale = this.value;

        updateDesignTransform();

    });

}

// Rotate

if (rotateSlider) {

    rotateSlider.addEventListener("input", function () {

        designRotation = this.value;

        updateDesignTransform();

    });

}
/*==================================================
DESIGN BUILDER
SHIRT COLOUR CHANGER
==================================================*/

const shirt = document.getElementById("shirt");
const shirtColour = document.getElementById("shirtColour");

if (shirt && shirtColour) {

    shirtColour.addEventListener("change", function () {

        const colour = this.value;

        shirt.src = "images/shirts/" + colour + ".png";

    });

}
/*==================================================
QUOTE BASKET SYSTEM
SAVE + ADD DESIGN
==================================================*/

let quoteBasket = JSON.parse(localStorage.getItem("quoteBasket")) || [];

// Save current design to basket
function addToQuoteBasket() {

    if (!designPreview || designPreview.style.display === "none") {
        alert("Please upload a design first.");
        return;
    }

    const item = {
        image: designPreview.src,
        size: designScale,
        rotation: designRotation,
        shirt: document.getElementById("shirtColour")?.value || "white",
        text: document.getElementById("customText")?.value || "",
        timestamp: Date.now()
    };

    quoteBasket.push(item);
    localStorage.setItem("quoteBasket", JSON.stringify(quoteBasket));

    alert("Design added to quote request!");
}

// Hook button
const addToQuoteBtn = document.getElementById("addToQuoteBtn");

if (addToQuoteBtn) {
    addToQuoteBtn.addEventListener("click", addToQuoteBasket);
}
/*==================================================
LOAD QUOTE BASKET ON QUOTE PAGE
==================================================*/

const quoteList = document.getElementById("quoteList");

function renderQuoteBasket() {

    if (!quoteList) return;

    quoteList.innerHTML = "";

    if (quoteBasket.length === 0) {
        quoteList.innerHTML = "<p>No designs selected yet.</p>";
        return;
    }

    quoteBasket.forEach((item, index) => {

        const div = document.createElement("div");
        div.className = "quote-item";

        div.innerHTML = `
            <img src="${item.image}" style="width:60px;border-radius:10px;">
            <div>
                <strong>${item.shirt}</strong><br>
                Size: ${item.size}px | Rotation: ${item.rotation}°
            </div>
            <button onclick="removeQuoteItem(${index})">Remove</button>
        `;

        quoteList.appendChild(div);

    });

}

function removeQuoteItem(index) {

    quoteBasket.splice(index, 1);
    localStorage.setItem("quoteBasket", JSON.stringify(quoteBasket));
    renderQuoteBasket();

}

// Run on page load
renderQuoteBasket();
