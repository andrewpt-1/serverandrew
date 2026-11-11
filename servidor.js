const express = require('express');
const path = require('path');
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cors());
app.set('trust proxy', 1);
app.use(helmet());

app.use((req, res, next) => {
  if (isProd && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
  }
  next();
});

function tokenAdmin(req, res, next) {
  if (req.session?.isAdmin) return next()

  if (req.path.startsWith('/api')) {
    return res.status(401).json({ erro: 'Não autenticado.' })
  }

  res.status(401).sendFile(path.join(__dirname, 'public', 'login.html'), (err) => {
    if (err) {
      console.error(err)
      res.status(500).end()
    }
  })
}

app.get('/', tokenAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.use(session({
    name: 'admin.token',
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 2
    }
}))

app.post('/api/login', async (req, res) => {
   try {
    const { email, password } = req.body

    if (!email || !password){
        return res.status(400).json({ Erro: 'O email ou password em falta.' })
    }

    if (password == process.env.ADMIN_HASH && email == process.env.EMAIL_ADMIN){
        req.session.regenerate((err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ erro: 'Erro no servidor.' })
      }

      req.session.isAdmin = true

      req.session.save((err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ erro: 'Erro no servidor.' })
        }
        return res.status(200).json({ ok: true })
      })
    })
    }
    else {
        return res.status(400).json( { erro: 'Erro ao fazer login.'} )
    }

    

   } catch(errorr){
        console.log(errorr)
   }

})

app.listen(3000, () => {
    console.log('Servidor Ligado')
})