const express = require('express')
const app = express()
const path = require('path')


// dodati css i js da rade
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/dashboard', (req,res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'))
})

app.post('/dashboard', (req,res) => {
    res.send('password added')
})

app.post('/signup', (req,res) => {
    res.send('signup post method')
})

app.post('/signin', (req,res) => {
    res.send('signin post method')
})

app.listen(3000)