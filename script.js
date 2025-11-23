let cardContainer = document.querySelector(".card-container");
let dados = [];

// 1. Função para carregar os dados do JSON em segundo plano
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // A linha que renderizava os cards foi removida daqui
}

// 2. Função para renderizar os cards na tela
function renderizarCards(dadosParaRenderizar) {
    // Limpa o container antes de adicionar novos cards
    cardContainer.innerHTML = "";

    // Se não houver dados para renderizar, exibe a mensagem
    if (dadosParaRenderizar.length === 0 && document.getElementById("campo-busca").value !== "") {
        cardContainer.innerHTML = `<p class="mensagem-erro">Nenhuma linguagem encontrada com este nome.</p>`;
        return;
    }

    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// 3. Função que realiza a busca
function realizarBusca() {
    const termoBusca = document.getElementById("campo-busca").value.toLowerCase();

    // Se a busca for vazia, limpa a tela e não faz nada.
    if (termoBusca === "") {
        cardContainer.innerHTML = "";
        return;
    }
    
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

// 4. Adiciona o evento de clique ao botão de busca
document.getElementById("botao-busca").addEventListener("click", realizarBusca);

// Adiciona o evento de pressionar tecla ao campo de busca
document.getElementById("campo-busca").addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === "Enter") {
        realizarBusca();
    }
});

// 5. Chama a função para carregar os dados assim que a página é carregada
carregarDados();