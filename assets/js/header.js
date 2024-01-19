const searchImg = document.getElementById('imgSearch')
const contentInputSearch = document.getElementById('content-input-search')

handlerSrcSearch();

// Altera entre os icones de pesquisar/fechar ao clica-los no header
// oculta e torna visible o input de pesquisa

function handlerSrcSearch() {
    if (searchImg && contentInputSearch) {
        searchImg.addEventListener('click', function () {

            if (searchImg.src.match("search.svg")) {
                searchImg.src = "../assets/img/close.svg";
                contentInputSearch.style.display = 'block'
            } else {
                searchImg.src = "../assets/img/search.svg";
                contentInputSearch.style.display = 'none'
            }
        });
    }
}

