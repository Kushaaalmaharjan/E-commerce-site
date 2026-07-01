const Product = require('../models/product');

const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    } catch(err) {
        next(err);
    }
};

const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }
    else{
        res.status(404).json({message: "Product not found"})
    }
    }catch(err){
        next(err);
    }
};

const createProduct = async (req, res) => {
    try{
        const product = new Product(req.body);
        const createdProduct = await product.save();
    res.status(201).json(createdProduct); 
    } catch(err){
        next(err);
    }
};

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true});
    if(product){
        res.json(product)
    }
    else{
        res.status(404).json({message: "Product not found"})
    }
    } catch(err){
        next(err);
    }
};

const deleteProduct = async (req, res) => {
   try{
     const product = await Product.findByIdAndDelete(req.params.id);
    if(product){
        res.json({message : " Product removed "});
    }
    else{
        res.status(404).json({message: " Product not found"});
    }
   } catch(err){
    next(err);
   }
};

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct};