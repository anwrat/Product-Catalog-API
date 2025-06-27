const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

//Passing a third argument with the capital name because mongodb automatically lowercases the name
const product = mongoose.model('Products',productSchema,'Products')
module.exports = product