const express = require('express')
const mongoose = require("mongoose")
const productRoute = require("./routes/product.route.js");
const app = express()

// middleware
app.use(express.json());

// routes
app.use("/api/products", productRoute);

  app.get('/', (req, res) =>{
     res.send("Hello from Node API server")
  });

  
mongoose.connect("mongodb+srv://rangataft08:m6XE59moRy0FhLdT@backenddb.3xwhved.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database!");
})
.catch(() =>{
    console.log("Connection failed!");
})