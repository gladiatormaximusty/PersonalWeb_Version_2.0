const express = require('express')
const app = express()
//連接 Router 模塊
require('./routes/admin/index')(app)
//連接 Mongodb
require('./plugin/db')(app)
//後端允許跨域：
app.use(require('cors')())
//允許後端接受 JSON 格式
app.use(express.json())

app.listen(3000,()=>{
    console.log('App is listen on 3000')
})