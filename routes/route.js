const express = require('express')
const router = express.Router()

const Products = require('../models/productModel')

//Create product
router.post('/create',async(req,res)=>{
    try{
        const{name,category,price} = req.body
        const product = new Products({name,category,price})
        await product.save()
        res.status(201).json({message: 'Product Created successfully'})
    } catch(err){
        //11000 is the code for duplicate error in NodeJS
        if(err.code === 11000){
            res.status(400).json({error: 'Product with same name exists'})
        }
        else{
            res.status(400).json({error: 'Product Creation failed'})
        }
    }
})

module.exports = router