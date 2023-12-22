const express = require('express')
const mongoose = require('mongoose')
const Product =  require('./models/productModel')
const app = express()

//CONNECTION
mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017/node-api-test')
.then(() => {
    console.log('connected to mongodb')
app.listen(3000, () => {
    console.log('Node API app is running on port 3000')
});

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//ROUTE
app.get('/', (req, res) => {
    res.send('Hello Node API')
})
//GET ALL PRODUCTS
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET SINGLE PRODUCT
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//UPDATE
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Oops We didn't Find the Product ${id}`})
        }
        const updatedProduct  = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE PRODUCTS
app.delete('/products/:id', async(req, res) => {
try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({message: `Oops We didn't Find the Product ${id}`})
    }
    res.status(200).json(product);
    
} catch (error) {
    res.status(500).json({message: error.message})
}
})

//SAVE TO PRODUCTS
app.post('/products', async(req, res) => {
try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
} catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
}
})


}).catch((error) => {
    console.log(error)
})
