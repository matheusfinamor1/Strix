var cont = 1
let isClickingTimeout = false;
let isClickManual = false;
var idRadioManualClicked = 0
document.getElementById('radio1').checked = true

setInterval(() => {
    nextImage()
}, 3000)

function nextImage() {
    cont++
    if (cont > 3) {
        cont = 1
    }
    isClickManual = false
    document.getElementById('radio' + cont).checked = true
}

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

function radioButtonManual(radioButtons) {
    function changeRadioButton(idRadioManualClicked) {
        // Remove a classe "active" de todos os labels
        document.querySelectorAll('.manual-btn').forEach(function (label) {
            label.classList.remove('active');
        });
        cont = idRadioManualClicked
    }

    // Inicia o processo
    changeRadioButton(idRadioManualClicked);
}

function extractNumericPart(id) {
    return id.replace('radio', '');
}
