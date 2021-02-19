const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)