const express = require('express')
const app = express()
require('./routes/admin/index')(app)
require('./plugin/db')(app)
app.listen(3000,()=>{
    console.log('App is listen on 3000')
})