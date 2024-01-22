const searchImg = document.getElementById('imgSearch')
const contentInputSearch = document.getElementById('content-input-search')
const input = document.getElementById('inputSearch')
var sliderNowPlaying = document.querySelector('.slider');
var sliderPopularMovie = document.querySelector('.slider-popular-movie');
var sliderUpcoming = document.querySelector('.slider-upcoming');
handlerSrcSearch();
handlerSearchInput()

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

// Manipula o input do search
function handlerSearchInput() {
    return input.addEventListener('input', function () {
        var content = input.value;
        if(content.length >= 3){
            searchDataInput(content)
            sliderInvisible();
        }else{
            sliderVisible();
        }
    });
}

function sliderInvisible() {
    sliderNowPlaying.style.display = 'none';
    sliderPopularMovie.style.display = 'none';
    sliderUpcoming.style.display = 'none';
}

function sliderVisible() {
    sliderNowPlaying.style.display = 'block';
    sliderPopularMovie.style.display = 'block';
    sliderUpcoming.style.display = 'block';
}

// Requisição da API
async function searchDataInput(input){
    const searchData = await searchMovie(input)
}