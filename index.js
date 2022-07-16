const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/Video');
const User = require('./models/User');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser: true,
useUnifiedTopology: true}, () => {
console.log('Connected to mongoDB')
});



app.get('/videos/all', async (req, res) =>{
  const videoData =  await Video.find();
    res.send(videoData);
  });

  app.post("/videos/search", async(req,res) => {
    // find videos like search term
    const videoData = await Video.find({
      title: { $regex: req.body.searchTerm, $options: "i" } 
    });
    res.send(videoData);
  }) 

app.post('/videos/add', async(req,res) => {
    const videoObject = {
      title: req.body.title,
      description: req.body.description,
      channel: req.body.channel,
      videoID: req.body.videoID,
      logoID:req.body.logoID
    }

    const video = new Video(videoObject)
    const result = await video.save()
    
    res.send({
      message:'Video added successfully'
    })
});

app.post("/user/add",async(req, res) => {
  const user = new User({
    email:  req.body.email,
    password: req.body.password,
  })

  const result = await user.save();

  res.send({
    message: "User added successfully",
    user: result
  });
})
  
   if(process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}


app.listen(5000, () =>{
    console.log('Server is running on port 5000');
});