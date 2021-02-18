//建立 MongoDB連線模塊化
module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/blogProject',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useUnifiedTopology:true
    })
}