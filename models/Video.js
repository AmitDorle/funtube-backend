const mongoose = require('mongoose')

const Video = mongoose.Schema({
    title:String,
    description:String,
    channel:String,
    videoID:String,
    logoID:String
})

const model = mongoose.model('Video',Video)


module.exports = model