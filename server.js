const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); 
const jwt=require('jsonwebtoken');
const app = express();
const middleware=require("./Middleware")
const reviewmodel=require("./Reviewmodel")
const cors=require('cors')
require('dotenv').config()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({origin:'*'}))

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log("DB connected");
}).catch(err => {
  console.error('DB connection error:', err);
});

app.get('/', (req, res) => {
  res.send("Hello pavan");
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmpassword, skill, mobile } = req.body;
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).send("User already registered");
    }

    if (password !== confirmpassword) {
      return res.status(400).send("Password and Confirm Password should be same");
    }

    let newUser = new User({
      name,
      email,
      mobile,
      skill,
      password,
      confirmpassword
    });

    await newUser.save();
    res.status(200).send('User successfully registered');
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const exist=await User.findOne({email})
        if(!exist){
            return res.status(400).send("User not exist")
        }
        if(exist.password!=password){
            return res.status(400).send("Invalid password")
        }
        let payload={
            user:{
                id:exist._id
            }
        }
        jwt.sign(payload,'jwtpassword',{expiresIn:36000000},
            (err,token)=>{
                if(err) throw err
                return res.json({token})
            }
        )

    }
    catch(err){
        console.error(err);
        res.status(500).send("Server error")

    }
})

app.get('/allprofiles',middleware,async(req,res)=>{
  try{
    const allprofiles=await User.find();
    return res.json(allprofiles)
  }
  catch(err){
    console.error(err);
    res.status(500).send("Server error")

}
})

app.get('/myprofile',middleware,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id);
    return res.json(user)
    }
    catch(err){
      console.error(err);
      res.status(500).send("Server error")
      }
})

app.post("/addreview",middleware,async(req,res)=>{
  try{
    const {taskworker,rating}=req.body;
    const exist=await User.findById(req.user.id)
    const newreview= new reviewmodel({
      taskprovider:exist.name,
      taskworker,rating
    })
    await newreview.save()
    return res.status(200).send("review added successfully")
      }
      catch(err){
        console.error(err);
        res.status(500).send("Server error")
        }
})

app.get("/myreviews",middleware,async(req,res)=>{
  try{
    const allreviews=await reviewmodel.find()
    const myreviews=allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString())
    return res.json(myreviews)
  }
  catch(err){
    console.error(err);
    res.status(500).send("Server error")
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));