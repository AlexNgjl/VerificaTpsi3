const API = "http://localhost:3000/api";

const userSelect = document.getElementById("userSelect");
const creditsSpan = document.getElementById("credits");
const productsDiv = document.getElementById("products");
const message = document.getElementById("message");

let currentUser = null;

function showMessage(text){
    message.textContent = text;
}

async function loadUsers(){

    const res = await fetch(API + "/users");
    const users = await res.json();

    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    currentUser = users[0];
    updateCredits(currentUser);
}

function updateCredits(user){
    creditsSpan.textContent = user.credits;
}

async function loadProducts(){

    const res = await fetch(API + "/products");
    const products = await res.json();

    productsDiv.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Prezzo: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="buyProduct(${product.id})">Compra</button>
        <hr>
        `;

        productsDiv.appendChild(div);

    });

}

async function buyProduct(productId){

    const res = await fetch(API + "/purchase", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            userId: currentUser.id,
            productId: productId
        })
    });

    const data = await res.json();

    if(!res.ok){
        showMessage(data.error);
        return;
    }

    showMessage(data.message);

    currentUser = data.user;
    updateCredits(currentUser);

    loadProducts();
}

userSelect.addEventListener("change", async () => {

    const res = await fetch(API + "/users/" + userSelect.value);
    currentUser = await res.json();

    updateCredits(currentUser);

});

loadUsers();
loadProducts();