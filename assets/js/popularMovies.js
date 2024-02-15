const sliderPopularMoviesContent = document.getElementById('content-popular-movie')
const slideBoxesPopularMovie = sliderPopularMoviesContent.querySelectorAll('.slide-box-popular-movie')

// Manipula os eventos de clique nos botoes de "prev" e "next" image do slider
document.addEventListener('DOMContentLoaded', function(){
    var nextButton = document.getElementById('next-slider-popular-movies')
    var prevButton = document.getElementById('prev-slider-popular-movies')
    var sliderContent = document.getElementById('content-popular-movie')
    var image = document.querySelector(".content-imgs-popular-movie span.slide-box-popular-movie");

    nextButton.addEventListener('click', function(){
        scrollSlider('next')
    })
    prevButton.addEventListener('click', function(){
        scrollSlider('prev')
    })

    function scrollSlider(direction){
        if(image){
            var widthImage = image.offsetWidth
            var scrollAmount = widthImage
            if(direction === 'next'){
                sliderContent.scrollLeft += scrollAmount
            }else if(direction === 'prev'){
                sliderContent.scrollLeft -= scrollAmount
            }
        }
    }
})

// Adiciona novos <img> a <span> para aparecer a imagem do poster no slider de files populares
function imgSlideBoxPopularMovies(postersPopularMovies, idPopularMovies) {
    for (let i = 0; i < postersPopularMovies.length; i++) {
        var slideBoxPopularMovie = slideBoxesPopularMovie[i]
        const imgPosterPopularMovie = document.createElement('img')
        imgPosterPopularMovie.src = `${postersPopularMovies[i]}`
        imgPosterPopularMovie.alt = `Poster do filme numero ${i}`
        imgPosterPopularMovie.id = `${idPopularMovies[i]}`
        slideBoxPopularMovie.appendChild(imgPosterPopularMovie)
    }
}

function clickItemPopularMovie(event){
    var id = event.target.id
    localStorage.setItem('idPopularMovieClicked', `${id}`)
    window.location.href = '../detailsMovie.html'
}

// Manipula os dados assincronos obtidos da API
(async function () {
    const popularMoviesData = await fetchIDPopularMovies()
    imgSlideBoxPopularMovies(popularMoviesData[0], popularMoviesData[1])
})()

