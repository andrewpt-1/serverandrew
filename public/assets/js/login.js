const inputEmail = document.getElementById('email')
const inputPass = document.getElementById('pass')
const assetLoading = document.getElementById('loader')
const conteinerLogin = document.getElementById('conteiner')

async function LoginRequest(){

    conteinerLogin.style.display = 'none'
    assetLoading.style.display = 'flex'

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: inputEmail,
                password: inputPass
            }
        })

    } catch(erro){
        console.log(erro)
    }
    
}