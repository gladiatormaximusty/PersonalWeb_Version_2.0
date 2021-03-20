module.exports = app => {
    const express = require('express')
    const router = express.Router()
    // const Category = require('../../models/Category')
    //新增分類：
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //分類列表顯示：
    router.get('/', async (req, res) => {
        //對於關聯關係，安全地判斷一下當前找到的Model是否正確：
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        console.log(req.Model)
        console.log('hi')
        res.send(items)
    })
    //詳情分類修改：
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //修改詳情：
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //刪除某行：
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    app.use('/admin/api/rest/:resource', (req, res, next) => {
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
}