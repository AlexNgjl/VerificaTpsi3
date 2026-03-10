const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dati finti in memoria
let users = [
  { id: 1, name: "Mario", credits: 100 },
  { id: 2, name: "Luigi", credits: 50 }
];

let products = [
  { id: 1, name: "Mouse", price: 25, stock: 10 },
  { id: 2, name: "Tastiera", price: 40, stock: 5 },
  { id: 3, name: "Cuffie", price: 60, stock: 2 }
];

let nextProductId = 4;

// Home
app.get("/", (req, res) => {
  res.json({ message: "API e-commerce attiva" });
});

// Lista utenti
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Singolo utente
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "Utente non trovato" });
  }

  res.json(user);
});

// Lista prodotti
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Acquisto prodotto
app.post("/api/purchase", (req, res) => {
  const { userId, productId } = req.body;

  const user = users.find(u => u.id === Number(userId));
  const product = products.find(p => p.id === Number(productId));

  if (!user) {
    return res.status(404).json({ error: "Utente non trovato" });
  }

  if (!product) {
    return res.status(404).json({ error: "Prodotto non trovato" });
  }

  if (product.stock <= 0) {
    return res.status(409).json({ error: "Prodotto esaurito" });
  }

  if (user.credits < product.price) {
    return res.status(409).json({ error: "Crediti insufficienti" });
  }

  user.credits -= product.price;
  product.stock -= 1;

  res.json({
    message: "Acquisto completato",
    user,
    product
  });
});

// Aggiungi prodotto
app.post("/api/products", (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: "Dati mancanti" });
  }

  const newProduct = {
    id: nextProductId++,
    name,
    price: Number(price),
    stock: Number(stock)
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Prodotto aggiunto",
    product: newProduct
  });
});

// Modifica stock
app.patch("/api/products/:id/stock", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  const { stock } = req.body;

  if (!product) {
    return res.status(404).json({ error: "Prodotto non trovato" });
  }

  if (stock === undefined || Number(stock) < 0) {
    return res.status(400).json({ error: "Stock non valido" });
  }

  product.stock = Number(stock);

  res.json({
    message: "Stock aggiornato",
    product
  });
});

// Bonus crediti
app.patch("/api/users/:id/credits", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  const { bonus } = req.body;

  if (!user) {
    return res.status(404).json({ error: "Utente non trovato" });
  }

  if (bonus === undefined || Number(bonus) <= 0) {
    return res.status(400).json({ error: "Bonus non valido" });
  }

  user.credits += Number(bonus);

  res.json({
    message: "Crediti aggiornati",
    user
  });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});