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
