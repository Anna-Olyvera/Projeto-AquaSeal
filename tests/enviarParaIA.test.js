const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();
const { enviarParaIA } = require("../javascript/script");

beforeEach(() => {
    fetch.resetMocks();
});

test("Deve enviar os dados corretamente para o servidor e receber uma resposta válida", async () => {
    const dados = { ph: 7.0, temperatura: 25 }; // Dados simulados
    const respostaEsperada = { mensagem: "Dados recebidos com sucesso" };

    // Mock da resposta do fetch
    fetch.mockResponseOnce(JSON.stringify(respostaEsperada), { status: 200 });

    const resultado = await enviarParaIA(dados);

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/processar-dados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    expect(resultado).toEqual(respostaEsperada); // Valida se o resultado foi tratado corretamente
});

test("Deve capturar e tratar erros do servidor", async () => {
    const dados = { ph: 7.0, temperatura: 25 };

    // Configura o mock para rejeitar a Promise
    fetch.mockReject(() => Promise.reject(new Error("Erro ao comunicar com a IA")));

    await expect(enviarParaIA(dados)).rejects.toThrow("Erro ao comunicar com a IA");
});
