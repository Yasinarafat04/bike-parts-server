const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');


const mongoose = require('mongoose')

const bodyParser = require('body-parser')
require('dotenv').config()

// app.use(bodyParser.json())

const port = process.env.PORT || 5000;
const app = express();

// used Middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3qtbx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// Create a async fucntion to all others activity
async function run() {
    try {
        await client.connect();

        // Create Database to store Data
        const serviceCollection = client.db("bike-parts").collection("services");

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


    } finally {
        // await client.close();
    }
}

// Call the fuction you decleare abobe
run().catch(console.dir);


// Root Api to cheack activity
app.get("/", (req, res) => {
    res.send("Welcome to bike parts!");
});

app.use('/users', require('./Routes/usersRouter'))
app.use('/product', require('./Routes/productRoute'))
app.use('/order', require('./Routes/orderRouter'))
app.use('/review', require('./Routes/reviewsRouter'))
app.use('/profile', require('./Routes/profileRouter'))
app.use('/payment', require('./Routes/paymentRouter'))

app.listen(port, () => {
    console.log(`bike parts listening on port ${port}`);
});