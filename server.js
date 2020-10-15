const express = require("express")
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()
const methodOverride = require('method-override')
const Article = require("./model/article");
mongoose.connect('mongodb+srv://DagogoUranta:"Justus214!"@cluster0.ndrrl.mongodb.net/MarkdownBlogCluster?retryWrites=true&w=majority',{useNewUrlParser: true , useUnifiedTopology:true , createIndexes: true})

app.set("view engine" , 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/articles', articleRouter)
app.use(methodOverride('_method'));

app.get("/" , async (req, res) => {
    const articles =  await Aritcle.find().sort({createdAt:'desc'})
    
    res.render('index.ejs',{articles :articles})
})

app.listen(5000)

