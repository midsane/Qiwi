const mongoose = require('mongoose');
const env = require('dotenv').config;

const mongoUrl = "mongodb+srv://streamdroid12:2qKSzrxQzFPFI5Y5@cluster0.qizs1.mongodb.net/qiwidb"

mongoose.connect(mongoUrl).then(() => console.log('connected successfully')).catch(e => console.log('error',e) );

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, required: true
    },
    imageUrl: {
        type: String, default: ''
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
});
  
const User = mongoose.model('User', userSchema);

const moodSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    energy: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  });

const Mood = mongoose.model('Mood', moodSchema);

const journalSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
        type: String,
        required: true,
    }
});

const Journal = mongoose.model('Journal', journalSchema);
module.exports = 
    {User,
    Journal,
    Mood
};