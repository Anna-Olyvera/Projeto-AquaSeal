const {enviarParaIA, guardarDados} = require("../javascript/script")


jest.mock("../javascript/script", () => ({
    enviarParaIA: jest.fn(),
    guardarDados: jest.fn(),
}));

const dados = {
    alcalinidade: "150",
    amonia: "0.5",
    bOD: "3",
    cloreto: "20",
    condutividade: "1200",
    oxigenioD: "8",
    ortofosfato: "0.1",
    ph: "7",
    temperatura: "25",
    durezaT: "200",
    corV: "15",
};
enviarParaIA(dados);

test("Deve capturar os dados do DOM e enviar para enviarParaIA", () => {

    guardarDados();

    expect(enviarParaIA).toHaveBeenCalledWith({
        alcalinidade: "150",
        amonia: "0.5",
        bOD: "3",
        cloreto: "20",
        condutividade: "1200",
        oxigenioD: "8",
        ortofosfato: "0.1",
        ph: "7",
        temperatura: "25",
        durezaT: "200",
        corV: "15",
    });
});

