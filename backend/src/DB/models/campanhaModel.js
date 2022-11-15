const mongoose = require('mongoose')

const { Schema } = mongoose

const campanha = new Schema({
  name: String, 
  body: String,
  data: String,
});


module.exports = mongoose.model('Campanhas', campanha)