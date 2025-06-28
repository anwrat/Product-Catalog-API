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

//Delete product
router.delete('/delete/:name',async(req,res)=>{
    try{
        const {name} = req.params
        //The below methods searches and deletes the document in mongodb and returns the document or null if not found
        const deletedProduct = await Products.findOneAndDelete({name})
        if(!deletedProduct){
            return res.status(400).json({error:`The product ${name} was not found`})
        }
        res.status(201).json({message:`The product ${name} was deleted successfully.`})
    } catch (err){
        res.status(400).json({error:'Error in deleting product'})
    }
})

//Update product
router.post('/update/:name',async(req,res)=>{
    try{
        const {name} = req.params
        const updates = req.body
        const updatedProduct = await Products.findOneAndUpdate({name},updates,{
            new:true //This returns the product
            })
        if(!updatedProduct){
            return res.status(400).json({error:`Product ${name} was not found`})
        }
        res.status(201).json({
            message:'Product updated successfully',
            product: updatedProduct
        })

    } catch(err){
        console.log(err)
        res.status(400).json({error:'Error while updating product'})
    }
})

//Filter product by category
router.post('/category/:categoryName',async(req,res)=>{
    try{
        const {categoryName}= req.params
        const products = await Products.find({category:categoryName})
        if(products.length === 0){
            return res.status(400).json({error:`No products were found under ${categoryName} category!!`})
        }
        res.status(200).json(products)

    } catch(err){
        res.status(400).json({error:'Failed to fetch products',details:err.message})
    }
})

module.exports = router