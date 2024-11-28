window.addEventListener("scroll", function() {
    const buttonTop = document.querySelector(".buttonTop");
    if (window.scrollY >= 250) { // Verifica se a rolagem é de 500px ou mais
        buttonTop.style.display = "flex"; // Exibe a div
    } else {
        buttonTop.style.display = "none"; // Oculta a div se estiver acima de 500px
    }
});