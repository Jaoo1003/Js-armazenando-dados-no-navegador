const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    
    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value)

    if(existe){

        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual
    } else {
        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)

        console.log(itens)
    }    
    
    localStorage.setItem("itens", JSON.stringify(itens)) 

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item){

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    
    lista.appendChild(novoItem)    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}