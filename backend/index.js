// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
const mongoUrl = process.env.DATABASE; //Make sure to put your mongodb atlas connection key 

mongoose.connect(mongoUrl)
  .then(() => {
     console.log('MongoDB connected')
     })
  .catch((err) => {
     console.log(err)
     
  });

// Define schema
const itemSchema = new mongoose.Schema({
  name: String,
  email: {
     type:String,
     trim: false},
  data: Array
},{versionKey: false});

const CommunitySchema = new mongoose.Schema({
   name: String,
   email: {
      type:String,
      trim: false},
   data: Array
 },{versionKey: false});

const UserModel = mongoose.model('datasets', itemSchema);
const CommunityModel = mongoose.model('communityDatasets', CommunitySchema);

app.post('/saveData', async (req, res) => {
  try {
   
   UserModel.create(req.body);

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/saveTocommunity', async (req, res) => {
   try {
   
    CommunityModel.create(req.body);
  
     res.json({ message: 'Data saved successfully' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
   }
 });

app.get('/user', async(req,res)=>{
   try{
      const user = req.query.email;
      
      const datas = await mongoose.connection.collection('datasets').find({email:user}).toArray();
      res.json(datas);
   }
   catch(error){
      //alert(error );
      res.status(500).json({ message: 'unable to retrieve' });
   }
});

app.get('/community', async(req,res)=>{
   try{

      const datas = await mongoose.connection.collection('communitydatasets').find().toArray();
      res.json(datas);
   }
   catch(error){
      //alert(error );
      res.status(500).json({ message: 'unable to retrieve' });
   }
});

app.listen(PORT, () => console.log(`Server running on port 3001`));

app.get("/",(req,res)=>{
   res.send({status:"started"});
});
