let isClickingTimeout = false;
let isClickManual = false;
var cont = 1
var idRadioManualClicked = 0
const sliderContent = document.getElementById('content');
const slideBoxes = sliderContent.querySelectorAll('.slide-box');
document.getElementById('radio1').checked = true

// Set do intervalo para ir para proxima imagem do carousel
setInterval(() => {
    nextImage()
}, 5000)
// Manipulação para ir para a proxima imagem do carousel, configurando o radiobutton correspondente a imagem
function nextImage() {
    cont++
    if (cont > 3) {
        cont = 1
    }
    isClickManual = false
    document.getElementById('radio' + cont).checked = true
}
/*
    Manipulação dos eventos de clique nos radio buttons;
    Configura um timeout para limitar o clique continuo;
*/
document.addEventListener("DOMContentLoaded", function () {
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    for (let buttonManual of radioButtons) {
        buttonManual.addEventListener('click', function (e) {
            if (!isClickingTimeout) {
                isClickingTimeout = true;
                isClickManual = true;
                idRadioManualClicked = parseInt(extractNumericPart(buttonManual.id))
                radioButtonManual(radioButtons, idRadioManualClicked)
                setTimeout(() => { isClickingTimeout = false; }, 500);
            } else {
                e.preventDefault();
            }
        });
    }
});
/*
    Configuração dos radio buttons;
    Remove o 'active' de todas as labels de radio button quando é realizado o clique
*/
function radioButtonManual() {
    function changeRadioButton(idRadioManualClicked) {
        document.querySelectorAll('.manual-btn').forEach(function (label) {
            label.classList.remove('active');
        });
        cont = idRadioManualClicked
    }
    changeRadioButton(idRadioManualClicked);
}

function extractNumericPart(id) {
    return id.replace('radio', '');
}
// Adiciona novos <img> a <div> para aparecer a imagem do cenario (poster) no carousel
function imgSlideBox(backdropsNowPlayingMovie) {
    for (let i = 0; i < backdropsNowPlayingMovie.length; i++) {
        var slideBox = slideBoxes[i]
        const img = document.createElement('img')
        img.src = `${backdropsNowPlayingMovie[i]}`
        img.alt = `Cenario do filme de numero ${i}`
        slideBox.appendChild(img)
    }
}
// Manipula os dados assincronos obtidos da API
(async function () {
    const nowPlayingData = await fetchNowPlaying()
    imgSlideBox(nowPlayingData)
})()


