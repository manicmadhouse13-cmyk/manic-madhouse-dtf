/*==================================================
MANIC MADHOUSE DTF DESIGNS
SHOP
VERSION 6.1
==================================================*/

function initialiseShop() {

    /*==============================
    SEARCH FILTER
    ==============================*/

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            document
                .querySelectorAll(".product-card, .collection-card")
                .forEach(card => {

                    const text = card.innerText.toLowerCase();

                    card.style.display =
                        text.includes(value) ? "" : "none";

                });

        });

    }

    /*==============================
    CATEGORY FILTER
    ==============================*/

    const categoryButtons =
        document.querySelectorAll(".category-buttons button");

    if (!categoryButtons.length) return;

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category =
                button.textContent.toLowerCase();

            document.querySelectorAll(".product-card")
                .forEach(card => {

                    const text =
                        card.innerText.toLowerCase();

                    if (category === "all") {

                        card.style.display = "";

                    } else {

                        card.style.display =
                            text.includes(category)
                                ? ""
                                : "none";

                    }

                });

        });

    });

}
