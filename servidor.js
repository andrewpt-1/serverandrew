const express = require('express');
const path = require('path');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body

    if (!email | !password){
        return res.status(401)
    }
    
    return res.status(201)
})

app.listen(3000, () => {
    console.log('Servidor Ligado')
})