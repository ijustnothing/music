const express = require('express')
const app = require('express')()

app.set('view engine','hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.render('main')
})

app.listen(3000)