document.getElementById("high-contrast").addEventListener("click", function() {
    document.body.classList.toggle("high-contrast");
});

let isReading = false; // Estado da leitura

// Função para iniciar ou parar a leitura
function iniciarLeitura() {
    if (isReading) { // Se já está lendo, parar a leitura
        window.speechSynthesis.cancel();
        isReading = false;
        return;
    }

    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'pt-BR';
    speech.pitch = 1;
    speech.rate = 1;

    // Texto a ser lido: capturando partes da página em ordem desejada
    let textoParaLer = '';

    // Cabeçalho
    const navItems = document.querySelectorAll(".navbar-nav .nav-link");
    navItems.forEach(item => {
        textoParaLer += ` ${item.textContent},`;
    });

    // Banners (imagens do slide)
    const imagensSlide = document.querySelectorAll(".carousel-inner .carousel-item img");
    imagensSlide.forEach(imagem => {
        if (imagem.alt) {
            textoParaLer += ` ${imagem.alt}`;
        }
    });

    // Descrição do projeto
    const descricaoProjeto = document.querySelector("div.container.mb-5 p");
    if (descricaoProjeto) {
        textoParaLer += ` ${descricaoProjeto.textContent}`;
    }

    // Benefícios (imagens e textos das cartas)
    const beneficios = document.querySelectorAll(".card");
    beneficios.forEach(card => {
        const imgAlt = card.querySelector("img").alt;
        const title = card.querySelector(".card-title").textContent;
        const text = card.querySelector(".card-text").textContent;
        textoParaLer += ` Imagem: ${imgAlt}, Título: ${title}, Descrição: ${text}.`;
    });

    // Atividades
    const atividades = document.querySelectorAll(".atividade-img");
    atividades.forEach(atividade => {
        if (atividade.alt) {
            textoParaLer += ` ${atividade.alt}`;
        }
    });

    // Rodapé
    const contato = document.querySelector("footer .container").innerText;
    textoParaLer += ` Contato: ${contato}`;

    // Atribuir o texto completo ao SpeechSynthesisUtterance
    speech.text = textoParaLer;

    // Iniciar leitura
    window.speechSynthesis.speak(speech);
    isReading = true;

    // Quando a leitura termina
    speech.onend = function() {
        isReading = false;
    };
}

// Adiciona o evento de clique ao ícone para iniciar/parar leitura
document.getElementById('readIcon').addEventListener('click', iniciarLeitura);