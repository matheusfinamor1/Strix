const search = document.getElementById('imgSearch')

handlerSrcSearch();

// Altera entre os icones de pesquisar/fechar ao clica-los no header
function handlerSrcSearch() {
    if (search) {
        search.addEventListener('click', function () {
            console.log("clicou");
            if (search.src.match("search.svg")) {
                search.src = "../assets/img/close.svg";
            } else {
                search.src = "../assets/img/search.svg";
            }
        });
    }
}

