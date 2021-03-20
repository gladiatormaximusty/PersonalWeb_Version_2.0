const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: { type: String },
    picture:{ type:String } 
})

module.exports = mongoose.model('Picture', schema)