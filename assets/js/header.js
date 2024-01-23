const searchImg = document.getElementById('imgSearch')
const contentInputSearch = document.getElementById('content-input-search')
const input = document.getElementById('inputSearch')
const movieList = document.getElementById('searchMovies')
var sliderNowPlaying = document.querySelector('.slider-nowplaying');
var sliderPopularMovie = document.querySelector('.slider-popular-movie');
var sliderUpcoming = document.querySelector('.slider-upcoming');
var moviesSearch = document.querySelector('.list-search-movie')
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
                moviesSearch.style.display = 'none'
                input.value = ''
                input.setAttribute('autocomplete', 'off')
                sliderVisible()
            }
        });
    }
}

// Manipula o input do search
function handlerSearchInput() {
    return input.addEventListener('input', function () {
        var content = input.value;
        if(content.length >= 3){
            loadMovieItens(content)
            sliderInvisible();
            moviesSearch.style.display = 'block'
        }else{
            sliderVisible();
            moviesSearch.style.display = 'none'
        }
    });
}

// Carrega os posters dos filmes e adicona no HTML
async function loadMovieItens(input){
    try{
        const movies = await movieApi.searchMovie(input)
        const newHtml = movies.map(convertMovieToLi).join('')
        while(movieList.firstChild){
            movieList.removeChild(movieList.firstChild)
        }
        movieList.innerHTML += newHtml
    }catch(error){
        console.error('Erro ao pesquisar filme:', error);
    }
   
}

// Converte os filmes no <li> do HTML
function convertMovieToLi(movie){
    console.log(`${movie}`);
    return `
        <li class="searchMovie">
                    <img src="${movie}" alt="Placeholder">
                </li>
    `
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