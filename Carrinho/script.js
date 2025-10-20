$(document).ready(function() {

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []


    const listaElement = $("#lista")
    const totalElement = $("#total")

    function exibirCarrinho(){
        listaElement.empty()
        let totalPreco = 0

        $.each(carrinho, function(index, item){
            const listItem = $("<li>").text(`${item.desc} - Preco: $${item.preco.toFixed(2)}`)
        
            const removeButton = $("<button>").text("X").css("margin-left", "10px").click(function(){
                removerItem(index)
            })

            listItem.append(removeButton)
            listaElement.append(listItem)

            totalPreco += item.preco
        })
        totalElement.text(`Total: $${totalPreco.toFixed(2)}`)
    }

    function removerItem(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
})

function gerar() {
    const listaElement = document.getElementById("lista");
    const totalElement = document.getElementById("total");

    if (!listaElement || !totalElement) {
        console.error("Elementos 'lista' ou 'total' não encontrados.");
        return;
    }

    // Clona a lista e remove os botões
    const listaClone = listaElement.cloneNode(true);
    $(listaClone).find("button").remove();

    const listaHtml = listaClone.innerHTML;
    const totalHtml = totalElement.innerHTML;

    const conteudoHTML = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Pedido Confirmado</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: green;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <h1>PEDIDO CONFIRMADO</h1>
                <h3>Agradecemos sua compra e sua preferência.</h3>
                <br>
                ${listaHtml}
                <br><br>
                <strong>${totalHtml}</strong>
            </body>
        </html>
    `;

    const blob = new Blob([conteudoHTML], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pedido.doc";
    link.click();

    // Exibe mensagem de confirmação
    const pedidoElement = document.getElementById("pedido");
    if (pedidoElement) {
        pedidoElement.style.display = "block";
    } else {
        console.warn("Elemento com ID 'pedido' não encontrado.");
    }
}

function successClose() {
    const pedidoElement = document.getElementById("pedido");
    if (pedidoElement) {
        pedidoElement.style.display = "none";
    }
}
