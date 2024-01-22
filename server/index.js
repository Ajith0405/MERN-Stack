require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users')
const ObjectId = require('mongodb');

const app = express()

app.use(express.json())
app.use(cors())

// mongoose.connect(process.env.MONGODB_URI); 
mongoose.connect("mongodb://127.0.0.1:27017/MernStack");
const port = process.env.PORT || 3001;



app.post('/register', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email already exists
        const existingUser = await UsersModel.findOne({ email });

        if (existingUser) {
            return res.json("The Email is already exists.");
        }

        // If email doesn't exist, create a new user
        const newUser = await UsersModel.create(req.body);

        res.json(newUser);
    } catch (error) {
        res.json(error);
    }
});



// Login
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password){
                // res.json("Success")
                res.json(user)
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No user is found please register")
        }
    })
})

// Get User details
app.get('/getUser/:id',(req, res)=>{
    const id = req.params.id;
    UsersModel.findById({_id:id})
    .then(user=>{
        res.json(user)
    })
    .catch(err => res.json(err))
})

// Update User details
app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UsersModel.findByIdAndUpdate({_id:id}, {
        age: req.body.age, 
        dob: req.body.dob, 
        gender: req.body.gender,
        mobile: req.body.mobile, 
        highEdu: req.body.highEdu})
    .then(user=>{
        res.json(user)
    })
    .catch(err => res.json(err))
})

//Delete User
// Delete User
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UsersModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// app.get('/add/',(req,res) =>{ 
    
//     const a = parseFloat(req.query.a || 0);
//     const b = parseFloat(req.query.b || 0);
//     const sum = a + b;

//   res.json({ result: sum });

// })

// app.get('/sub/' ,(req,res) =>{
//     const a = parseFloat(req.query.a||0);
//     const b = parseFloat(req.query.b||0);
//     const sub = a-b;

//     res.json({result: sub});
// })

app.listen(port,()=>{
    console.log("server is running");
})