const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true
    },
    productID:{
        type: String,
        required: true
    },
    name: {
        type :String,
        required : true
    },
    transId: {
        type :String,
        required : true 
    },
    date:{
        type : String,
        default : Date.now
    }
})

module.exports = paymentSchema