/*==================================================
MANIC MADHOUSE DTF DESIGNS
NAVIGATION
VERSION 6.1
==================================================*/

function initialiseNavigation() {

    /*==============================
    ACTIVE NAVIGATION
    ==============================*/

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });

    /*==============================
    BACK TO TOP BUTTON
    ==============================*/

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            topBtn.style.display =
                window.scrollY > 300 ? "flex" : "none";

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

}
