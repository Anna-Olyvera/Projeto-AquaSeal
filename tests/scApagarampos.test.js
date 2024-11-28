const {limparInputs} = require("../javascript/scApagarampos");

test('não deve afetar nada quando não houver campos do tipo number', () => {
    document.body.innerHTML = `
        <form>
            <input type="text" value="Texto">
            <input type="email" value="email@dominio.com">
        </form>
    `;
    
    limparInputs();

    // Verifica se os campos não foram alterados
    const textInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');

    expect(textInput.value).toBe('Texto');
    expect(emailInput.value).toBe('email@dominio.com');
});

test('deve limpar o campo de entrada do tipo number', () => {
    document.body.innerHTML = `
        <form>
            <input type="number" value="5">
        </form>
    `;
    
    limparInputs();

    // Verifica se o valor foi apagado
    const numberInput = document.querySelector('input[type="number"]');
    expect(numberInput.value).toBe('');
});

test('deve limpar vários campos de entrada do tipo number', () => {
    document.body.innerHTML = `
        <form>
            <input type="number" value="5">
            <input type="number" value="10">
            <input type="number" value="58">
        </form>
    `;
    
    limparInputs();

    // Verifica se todos os campos foram limpos
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        expect(input.value).toBe('');
    });
});

test('não deve afetar campos de entrada de outros tipos', () => {
    document.body.innerHTML = `
        <form>
            <input type="text" value="Texto">
            <input type="email" value="email@dominio.com">
            <input type="number" value="5">
        </form>
    `;
    
    limparInputs();

    // Verifica se o campo número foi limpo, mas os outros campos não
    const textInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const numberInput = document.querySelector('input[type="number"]');

    expect(textInput.value).toBe('Texto');
    expect(emailInput.value).toBe('email@dominio.com');
    expect(numberInput.value).toBe('');
});

test('deve limpar campos com valores não numéricos', () => {
    document.body.innerHTML = `
        <form>
            <input type="number" value="abc">
            <input type="number" value="@#!">
        </form>
    `;
    
    limparInputs();

    // Verifica se os campos com valores não numéricos também foram limpos
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        expect(input.value).toBe('');
    });
});

