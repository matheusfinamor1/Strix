const sliderPopularMoviesContent = document.getElementById('content-popular-movie')
const slideBoxesPopularMovie = sliderPopularMoviesContent.querySelectorAll('.slide-box-popular-movie')

// Adiciona novos <img> a <span> para aparecer a imagem do poster no slider de files populares
function imgSlideBoxPopularMovies(postersPopularMovies) {
    for (let i = 0; i < postersPopularMovies.length; i++) {
        var slideBoxPopularMovie = slideBoxesPopularMovie[i]
        const imgPosterPopularMovie = document.createElement('img')
        imgPosterPopularMovie.src = `${postersPopularMovies[i]}`
        imgPosterPopularMovie.alt = `Poster do filme numero ${i}`
        slideBoxPopularMovie.appendChild(imgPosterPopularMovie)
    }
}

// Manipula os dados assincronos obtidos da API
(async function () {
    const popularMoviesData = await fetchIDPopularMovies()
    imgSlideBoxPopularMovies(popularMoviesData)
})()

