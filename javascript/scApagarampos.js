function limparInputs() {
    // Seleciona todos os elementos de entrada no formulário
    const inputs = document.querySelectorAll('input[type="number"]');
    
    // Itera por cada elemento e redefine o valor para vazio
    inputs.forEach(input => {
        input.value = "";
    });

    console.log("Todos os campos foram limpos.");
}

module.exports = {limparInputs};