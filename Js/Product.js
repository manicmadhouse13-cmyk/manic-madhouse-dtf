const params = new URLSearchParams(window.location.search);

const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);

document.getElementById("productName").innerText = product.name;

document.getElementById("productPrice").innerText = "$" + product.price;

document.getElementById("productImage").src = product.image;

document.getElementById("addCart").onclick = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({

        id: product.id,

        name: product.name,

        image: product.image,

        price: product.price,

        qty: parseInt(document.getElementById("qty").value),

        size: document.getElementById("size").value

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");

};
