async function enviarParaIA(dados) {
    const url = "http://127.0.0.1:5000/processar-dados"; // URL do servidor Python

    try {
        const resposta = await fetch(url, {
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json", // Informando que o corpo da requisição é JSON
            },
            body: JSON.stringify(dados), // Convertendo os dados para JSON
        });

        if (!resposta.ok) {
            throw new Error("Erro ao comunicar com a IA");
        }

        const resultado = await resposta.json(); // Obtém a resposta da IA
        console.log("Resposta da IA:", resultado);

        // Atualiza o conteúdo da div com base na resposta da IA
        atualizarResposta(resultado.classificacao);
    } catch (erro) {
        console.error("Erro:", erro);
    }
}

// Função para atualizar a div "resposta" com o resultado da IA
function atualizarResposta(classificacao) {
    const divResposta = document.querySelector(".resposta");

    // Remove o conteúdo existente (como a tag <p>)
    divResposta.innerHTML = "";

    // Define o texto explicativo com base na resposta
    let textoExplicativo = "";
    if (classificacao === "bom") {
        textoExplicativo = "A água está em boas condições, adequada para consumo e para manter a vida aquática.";
    } else if (classificacao === "ruim") {
        textoExplicativo = "A água está em más condições, possivelmente contaminada ou inadequada para consumo.";
    } else if (classificacao === "regular") {
        textoExplicativo = "A água está em condições medianas, podendo exigir cuidados adicionais para consumo seguro.";
    } else {
        textoExplicativo = "Resultado inesperado recebido da IA. Por favor, revise os dados.";
    }

    // Cria novos elementos para exibir o resultado e o texto explicativo
    const resultadoElement = document.createElement("h3");
    resultadoElement.textContent = `Classificação da água: ${classificacao}`;

    const explicativoElement = document.createElement("p");
    explicativoElement.textContent = textoExplicativo;

    // Adiciona os elementos à div "resposta"
    divResposta.appendChild(resultadoElement);
    divResposta.appendChild(explicativoElement);
}

// Exemplo de como usar:
function guardarDados() {
    const dados = {
        alcalinidade: document.querySelector('.alcalinidade').value,
        amonia: document.querySelector('.amonia').value,
        bOD: document.querySelector('.bOD').value,
        cloreto: document.querySelector('.cloreto').value,
        condutividade: document.querySelector('.condutividade').value,
        oxigenioD: document.querySelector('.oxigenioD').value,
        ortofosfato: document.querySelector('.ortofosfato').value,
        ph: document.querySelector('.ph').value,
        temperatura: document.querySelector('.temperatura').value,
        durezaT: document.querySelector('.durezaT').value,
        corV: document.querySelector('.corV').value,
    };

    console.log("Dados coletados:", dados);

    // Envia os dados para a IA
    enviarParaIA(dados);
}