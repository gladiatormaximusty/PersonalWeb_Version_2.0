const express = require('express')
const app = express()

//給密鑰全局加上屬性：
app.set('secret','之後定義值')


//後端允許跨域(跨域要寫在上方喔！)：
app.use(require('cors')())
//允許後端接受 JSON 格式
app.use(express.json())

//靜態資源託管
app.use('/uploads',express.static(__dirname + '/uploads'));

//連接 Router 模塊
require('./routes/admin/index')(app)
//連接 Mongodb
require('./plugin/db')(app)


app.listen(3000,()=>{
    console.log('App is listen on 3000')
})