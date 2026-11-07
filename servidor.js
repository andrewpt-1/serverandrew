const express = require('express');
const path = require('path');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/api/login', async (req, res) => {
   try {
    const { email, password } = req.body

    if (!email || !password){
        return res.status(400)
    }
    
    return res.status(200)

   } catch(errorr){
        console.log(errorr)
   }

})

app.listen(3000, () => {
    console.log('Servidor Ligado')
})