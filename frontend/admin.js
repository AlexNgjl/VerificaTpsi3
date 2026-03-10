const API = "http://localhost:3000/api";

const adminProducts = document.getElementById("adminProducts");
const adminMessage = document.getElementById("adminMessage");
const userBonus = document.getElementById("userBonus");

function showMessage(text){
    adminMessage.textContent = text;
}

async function loadUsers(){

    const res = await fetch(API + "/users");
    const users = await res.json();

    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userBonus.appendChild(option);
    });

}

async function loadProducts(){

    const res = await fetch(API + "/products");
    const products = await res.json();

    adminProducts.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Stock attuale: ${product.stock}</p>
        <input type="number" id="stock-${product.id}" value="${product.stock}">
        <button onclick="updateStock(${product.id})">Aggiorna Stock</button>
        <hr>
        `;

        adminProducts.appendChild(div);

    });

}

async function updateStock(id){

    const stock = document.getElementById("stock-"+id).value;

    const res = await fetch(API + "/products/"+id+"/stock",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({stock})
    });

    const data = await res.json();

    showMessage(data.message || data.error);

    loadProducts();

}

async function addProduct(){

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    const res = await fetch(API + "/products",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name,price,stock})
    });

    const data = await res.json();

    showMessage(data.message || data.error);

    loadProducts();
}

async function giveBonus(){

    const id = userBonus.value;
    const bonus = document.getElementById("bonus").value;

    const res = await fetch(API + "/users/"+id+"/credits",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({bonus})
    });

    const data = await res.json();

    showMessage(data.message || data.error);

}

loadUsers();
loadProducts();