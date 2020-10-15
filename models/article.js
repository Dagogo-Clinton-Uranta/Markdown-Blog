const mongoose = require('mongoose')
const marked =require("marked")
const slugify = require('slugify')



const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String

    },
    markdown: {
      type: String,
      required: true   
    },
     createdAt: {
         type: Date,
         default: () => Date.now
     },
     slug: {
         type: String,
         required: true,
         unique:true
     },

     convertedHtml: {
         type: String,
         required: true
     }
})

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug =slugify(this.title, {lower:true, strict: true} )
    }

    if (this.markdown){
        this.convertedHtml = marked(this.markdown)
    }
    next()
})

module.exports = mongoose.model("Article",articleSchema)