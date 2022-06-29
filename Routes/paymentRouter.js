const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const paymentSchema = require('../Schemas/paymentSchema')
const verifyJWT = require('../verifyJWT')
const Payment = new mongoose.model('Payment', paymentSchema)
const stripe = require("stripe")('sk_test_51L0rFmLYwJHp3nTSG0R2Rz3ToMYwkgmXYPbOCcrNVqvpLyRPRL8vLt3oICpxpj3L60U99Ryuqom1uCo1iwGGSijt00tO1ZIVAE');

router.get('/', (req, res) => {
    Payment.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "Server Site Provlem" })
        }
        else {
            res.status(200).send(data)
        }
    })
})
router.post('/create-payment-intent', async (req, res) => {
    const data = req.body
    const price = parseInt(data.price)
    const amount = price * 100
    await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: [
            "card"
        ],
    },(err , data)=>{
        if (err) {
            res.status(500).send({message: "server Problem"})
        }
        else{
            res.status(200).send({
                clientSecret: data.client_secret,
            });
        }
    });
})
router.post('/', (req, res) => {
    const email = req.params.email
    const newPayment = new Payment(req.body)
    newPayment.save((err) => {
        if (err) {
            res.status(500).send({ message: "Server Site Provlem" })
        }
        else {
            res.status(200).send({ message: 'Data Inserted' })
        }
    })
})

module.exports = router