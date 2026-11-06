const express = require('express');
const path = require('path');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/api/discord/sms', (req, res) => {
    const { nome, sobrenome, email, messagem } = req.body

    if (!nome){
        res.status(401)
        return
    }

    console.log( nome, 'o nome aqui')
})

app.listen(3000, () => {
    console.log('Servidor Ligado')
})