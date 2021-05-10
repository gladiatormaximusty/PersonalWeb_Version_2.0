module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser');
    const router = express.Router()
    // const Category = require('../../models/Category')
    //新增資源：
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //資源列表顯示：
    router.get('/',async (req, res) => {
        //對於關聯關係，安全地判斷一下當前找到的Model是否正確：
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        //items[index] 用以取得 列表資料（包含 parents）
        // console.log(items[0].parent.name)
        res.send(items)
    })
    //資源分類修改：
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //修改資源：
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //刪除某行資源：
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //通用資源接口
    app.use('/admin/api/rest/:resource', async(req,res,next)=>{
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token,401,'請先登入');
        const { id } = jwt.verify(token,app.get('secret'));
        assert(id,401,'請先登入');
        req.user = await AdminUser.findById(id);
        assert(req.user,401,'請先登入');
        // console.log(req.user)
        await next()
    },async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    const multer = require('multer');
    const upload = multer({dest:__dirname + '/../../uploads' });
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })

    //登入接口：
    app.post('/admin/api/login',async(req,res)=>{
       const {username, password} = req.body
       // 1.根據使用者名稱找到 DB 用戶名稱：
       const user = await AdminUser.findOne({username}).select('+password');
       assert(user,487,'不存在使用者');
       //2.校驗密碼：
       const isValid = require('bcrypt').compareSync(password,user.password)
       if(!isValid){
           return res.status(487).send({
               message:'密碼錯誤'
           })
       }
       //3.返回 token：
       //jwt sign 生成 token  ps.第二個參數為密鑰，給客戶端使用（這邊簡單使用） jwt sign 對應 jwt varified                      
       const token = jwt.sign({id:user._id},app.get('secret'))
       res.send({token})
    })

    //錯誤異常抓取：
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}