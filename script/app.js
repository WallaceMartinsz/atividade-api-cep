const formulario = document.getElementById("form")
const cep = document.getElementById("inputCep")
const rua = document.getElementById("inputRua")
const cidade = document.getElementById("inputCidade")
const uf = document.getElementById("inputUf")
const bairro = document.getElementById("inputBairro")
const ddd = document.getElementById("inputDDD")
const p = document.getElementById("cep-invalido")

formulario.addEventListener("submit", (e) =>{
    e.preventDefault()
    consultarCep(cep)
})

function consultarCep(c){
    let cepValor = c.value.replace("-", "").replace(".", "")

    if(cepValor === "" || cepValor == null){
        p.style.display = "block"
    }else{
        if(validarCep(cepValor)){
            p.style.display = "none"
            console.log("Cep válido!")
            buscarEndereco(cepValor)
        }else{
            p.style.display = "block"
        }
    }
}

function buscarEndereco(c) {
    let URL = "https://viacep.com.br/ws/"+c+"/json/"

    fetch(URL).then(res =>{
        return res.json()
    }).then(saida => {
        rua.value = saida.logradouro
        cidade.value = saida.localidade
        uf.value = saida.uf
        bairro.value = saida.bairro
        ddd.value = saida.ddd
    })
}

function validarCep(c){
    let re = /^[0-9]{8}$/
    return re.test(c)
}