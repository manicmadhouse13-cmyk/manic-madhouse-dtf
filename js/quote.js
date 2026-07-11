/*==================================================
MANIC MADHOUSE DTF DESIGNS
QUOTE SYSTEM
VERSION 6.1
==================================================*/

function initialiseQuote() {

    const STORAGE_KEY = "quoteBasket";

    let quoteBasket = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const quoteList = document.getElementById("quoteList");

    function saveBasket() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteBasket));
    }

    function renderBasket() {

        if (!quoteList) return;

        quoteList.innerHTML = "";

        if (quoteBasket.length === 0) {

            quoteList.innerHTML =
                "<p>No designs have been added to your quote yet.</p>";

            updateQuoteCount();
            return;

        }

        quoteBasket.forEach((item, index) => {

            const card = document.createElement("div");

            card.className = "quote-item";

            card.innerHTML = `

                <img src="${item.image}" alt="Design Preview">

                <div class="quote-details">

                    <h3>${item.shirt}</h3>

                    <p>Size: ${item.size}px</p>

                    <p>Rotation: ${item.rotation}°</p>

                    ${item.text ? `<p>${item.text}</p>` : ""}

                </div>

                <button
                    class="remove-quote"
                    data-index="${index}">
                    Remove
                </button>

            `;

            quoteList.appendChild(card);

        });

        updateQuoteCount();

    }

    function updateQuoteCount() {

        document.querySelectorAll(".quote-count").forEach(counter => {

            counter.textContent = quoteBasket.length;

        });

    }

    function addItem(item) {

        quoteBasket.push(item);

        saveBasket();

        renderBasket();

    }

    function removeItem(index) {

        quoteBasket.splice(index, 1);

        saveBasket();

        renderBasket();

    }

    document.addEventListener("click", event => {

        if (event.target.classList.contains("remove-quote")) {

            removeItem(Number(event.target.dataset.index));

        }

    });

    window.quoteSystem = {

        add: addItem,

        getItems: () => quoteBasket,

        clear() {

            quoteBasket = [];

            saveBasket();

            renderBasket();

        }

    };

    renderBasket();

}
