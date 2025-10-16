let produtos = []

window.onload = function() {
    var storedUser = localStorage.getItem("usuario")
    var user = JSON.parse(storedUser)

    var dataEntrada = new Date(user.dataEntrada)

    var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    })

    document.getElementById("user").textContent = user.name
    document.getElementById("perfil").textContent = dataFormatada
    document.getElementById("idPerfil").textContent = user.id
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("../Dados/loja.json")
        .then((response) => response.json())
        .then((data) => {
            produtos = data
            const produtosContainer = document.getElementById("produtos-container")

            produtos.forEach((produto, index) => {
                const card = document.createElement("div")
                card.className = "card"
                card.style.width = "18rem"

                const imagem = document.createElement("img")
                imagem.src = produto.imagem
                imagem.className = "card-img-top"

                const cardBody = document.createElement("div")
                cardBody.className = "card-body"

                const cardTitle = document.createElement("h5")
                cardTitle.className = "card-title"
                cardTitle.textContent = produto.descricao
                cardTitle.textContent = produto.nome

                const cardText = document.createElement("p")
                cardText.className = "card-text"
                cardText.textContent = "Preço: $" + produto.preco.toFixed(2)

                const btnAdicionarAoCarrinho = document.createElement("a")
                btnAdicionarAoCarrinho.href = "#"
                btnAdicionarAoCarrinho.className = "btn btn-primary adicionar"
                btnAdicionarAoCarrinho.textContent = "Adicionar ao Carrinho"
                btnAdicionarAoCarrinho.setAttribute("data-indice", index)

                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardText)
                cardBody.appendChild(btnAdicionarAoCarrinho)

                card.appendChild(imagem)
                card.appendChild(cardBody)

                produtosContainer.appendChild(card)
            })
        })
        .catch((error) => console.log("Erro", error))

        $("#produtos-container").on("click", ".adicionar", function(){
            const indexDoProduto = $(this).data("indice")
            const produtoSelecionado = produtos[indexDoProduto]
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
            carrinho.push(produtoSelecionado)
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
            alert("Produto adicionado com sucesso!!!")
        })
})
