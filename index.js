const express = require('express')
const mongoose = require("mongoose")
const Product = require('./models/product.model.js');
const app = express()


app.use(express.json());

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
  });


  app.get('/', (req, res) =>{
     res.send("Hello from Node API server")
  });


   // get all the product API
  app.get('/api/products', async (req, res) =>{
    try {
       const products = await Product.find({});
       res.status(200).json(products); 
    } catch (error) {
    res.status(500).json({ message: error.message});
    }
  });

   // get a product using the Id API
  app.get('/api/product/:id', async (req, res) =>{
    try {
    const {id} = req.params;
    const product= await Product.findById(id);
    res.status(200).json(product);
    } catch (error) {
    res.status(500).json({ message: error.message});
    }
  });

 // adding the products API
  app.post('/api/products', async (req, res) =>{
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
  });


  // update a product based of the Id API
  app.put('/api/product/:id', async (req, res) =>{
    try {
      const {id} = req.params;
      const product= await Product.findByIdAndUpdate(id, req.body);
      if (!product){
      return res.status(404).json({message: "Product not found"});
      }
     const updatedProduct = await Product.findById(id);
     res.status(200).json(updatedProduct);

    } catch (error) {
      res.status(500).json({ message: error.message});
    }
    });


     // delete a product API

     app.delete('/api/product/:id', async (req, res) =>{
      try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product){
          return res.status(404).json({message: "Product not found"});
          }
          res.status(200).json({ message: "Product deleted successfully"});

      } catch (error) {
        res.status(500).json({ message: error.message});
      }
      });

  
mongoose.connect("mongodb+srv://rangataft08:m6XE59moRy0FhLdT@backenddb.3xwhved.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database!");
})
.catch(() =>{
    console.log("Connection failed!");
})