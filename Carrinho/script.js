$(ducument).ready(function() {

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []


    const listaElement = $("#lista")

    const totalElement = $("#total")

    function exibirCarrinho(){
        listaElement.empty()
        let totalpreco = 0

        $.each(carrinho, function(index, item){
            const listItem = $("<li>").text(`${item.desc} - Preco: $${item.preco.toFixed(2)}`)
        
            const removeButton = $("<button>").text("❌").css("margin-left", "10px").click(function(){
                removerItem(index)
            })

            listItem.append(removeButton)
            listaElement.append(listItem)

            totalPreco += item.preco
        })
        totalElement.text(`Total: $${totalPreco.toFixed(2)}`)
    }

    exibirCarrinho()
})