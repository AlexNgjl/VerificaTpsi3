<<<<<<< HEAD
# E-Commerce Distribuito

## Descrizione

Questo progetto implementa una semplice architettura client-server per un e-commerce fittizio.

Il sistema è composto da:

- Backend sviluppato con Node.js + Express
- Frontend sviluppato con HTML, CSS e Vanilla JavaScript

Il sistema offre due interfacce:

- Vista Utente
- Vista Admin

La comunicazione tra frontend e backend avviene tramite API REST e JSON.

---

## Architettura

Il client implementato è un **Thin Client**.

Motivazione:

Il frontend si occupa solo di:
- visualizzare i dati
- inviare richieste HTTP al server tramite fetch()

Tutta la logica principale dell'applicazione viene gestita dal backend, che controlla:

- acquisti
- crediti utenti
- disponibilità prodotti
- aggiornamento stock

Questo approccio aumenta la sicurezza perché il client non è considerato affidabile.

---

## Struttura del progetto

ecommerce-distribuito

backend/
- server.js
- package.json
- package-lock.json
- users.json
- products.json

frontend/
- index.html
- admin.html
- style.css
- user.js
- admin.js

README.md

---

## Endpoint API

### Prodotti

GET /api/products  
Restituisce il catalogo dei prodotti.

Esempio risposta:

[
  {
    "id": 1,
    "name": "Mouse",
    "price": 25,
    "stock": 10
  }
]

---

POST /api/products  
Permette all'admin di aggiungere un nuovo prodotto.

Payload esempio:

{
  "name": "Monitor",
  "price": 200,
  "stock": 5
}

---

PATCH /api/products/:id/stock  
Permette all'admin di modificare lo stock di un prodotto.

Payload esempio:

{
  "stock": 10
}

---

### Utenti

GET /api/users  
Restituisce la lista degli utenti.

---

GET /api/users/:id  
Restituisce i dati di un singolo utente.

---

PATCH /api/users/:id/credits  
Permette all'admin di assegnare crediti bonus ad un utente.

Payload esempio:

{
  "bonus": 50
}

---

### Acquisto prodotto

POST /api/purchase

Permette ad un utente di acquistare un prodotto.

Payload esempio:

{
  "userId": 1,
  "productId": 2
}

---

## Sicurezza

Il backend implementa diversi controlli per evitare operazioni non valide.

Controlli implementati:

- verifica esistenza utente
- verifica esistenza prodotto
- controllo crediti sufficienti
- controllo disponibilità stock
- validazione dei dati ricevuti

Errori HTTP utilizzati:

400 - Bad Request (input non valido)  
404 - Risorsa non trovata  
409 - Conflitto (crediti insufficienti o prodotto esaurito)

Questo impedisce a un utente di manipolare il frontend per eseguire operazioni non valide.

---

## Gestione dei dati

I dati vengono salvati in file JSON nel backend:

users.json  
products.json  

Il server legge e aggiorna questi file quando vengono effettuate operazioni come:

- acquisto prodotti
- modifica stock
- assegnazione crediti bonus
- aggiunta prodotti

Questo permette di mantenere i dati anche dopo il riavvio del server.

---

## Uso dell'IA

L'intelligenza artificiale è stata utilizzata per:

- supporto nella progettazione dell'architettura client-server
- scrittura e debug del codice Node.js
- generazione delle API REST
- supporto nello sviluppo del frontend
- stesura della documentazione

L'IA non è stata utilizzata per deploy automatici o agenti autonomi.

---

## Avvio del progetto

### Backend

Entrare nella cartella backend:

cd backend

Installare le dipendenze:

npm install

Avviare il server:

npm start

Il server sarà disponibile su:

http://localhost:3000

---

### Frontend

Aprire nel browser:

frontend/index.html

oppure

frontend/admin.html

---

## Deploy

Backend deployato su:

INSERIRE_URL_RENDER

Frontend:

eseguito localmente
=======
# VerificaTpsi3
>>>>>>> 3a4a0193281c2b4a1fbc3e3c33779d6b944473f6
