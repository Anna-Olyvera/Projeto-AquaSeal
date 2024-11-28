/* SCRIPT PARA INTERAGIR COM A IA E GUARDAR DADOS */

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

        return resultado; // Faça algo com o resultado, como exibir na tela

    } catch (erro) {
        throw new Error(erro.message || "Erro inesperado");
    }
};

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

module.exports = {guardarDados, enviarParaIA};