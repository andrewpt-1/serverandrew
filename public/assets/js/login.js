const inputEmail = document.getElementById('email')
const inputPass = document.getElementById('pass')
const assetLoading = document.getElementById('loader')
const conteinerLogin = document.getElementById('conteiner')

async function LoginRequest(){

    conteinerLogin.style.display = 'none'
    assetLoading.style.display = 'flex'

    try {
        const res = await fetch('https://serverandrew.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPass.value
                })
            });

        if (res.status == 200){
            alert('sigma')
        }

    } catch(erro){
        console.log(erro)
    }
    
}