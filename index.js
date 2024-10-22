const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = 4000;
require('dotenv').config();
const Blog = require("./models/blog.models");
app.use(cors());
app.use(express.json());

//creating blog
app.post('/create-blog', async (req,res) => {
    
    try{
        const {title, description} = req.body;
        const blog = new Blog({title, description});
        const response = await blog.save();
        console.log(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something went wrong"});
    }
   
})

//getting all blog
app.get('/get-blogs',async (req,res) =>{
    try{
        const blogs = await Blog.find({});
        res.send({count:blogs.length, data:blogs});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something went wrong"});
    }
});

// getting single blog
app.get('/blog/:id',async (req,res) =>{
    try{
        const id = req.params.id;
        const response= await Blog.findById(id);
        console.log(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something went wrong"});
    }
});

//updating blog
app.put('/blog/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const response= await Blog.findByIdAndUpdate(id,data);
        console.log(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something went wrong"});
    }
})

//Deleting blog
app.delete('/blog/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const response= await Blog.findByIdAndDelete(id);
        console.log(response);
        res.send('deleted');
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something went wrong"});
    }
})

app.get("/",async(req,res) => {
    res.send("hello from server 8000")
})

mongoose.connect(process.env.DB_URI).then((result) => {
    console.log(result);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}).catch(err => {
    console.log(err);
})

