const sliderUpcomingContent = document.getElementById('content-upcoming')
const slideBoxesUpcoming = sliderUpcomingContent.querySelectorAll('.slide-box-upcoming')

// Adiciona novos <img> a <span> para aparecer a imagem do poster no slider de files populares
function imgSlideBoxUpcoming(postersUpcoming) {
    for (let i = 0; i < postersUpcoming.length; i++) {
        var slideBoxUpcoming = slideBoxesUpcoming[i]
        const imgPosterUpcoming = document.createElement('img')
        imgPosterUpcoming.src = `${postersUpcoming[i]}`
        imgPosterUpcoming.alt = `Poster do filme numero ${i}`
        slideBoxUpcoming.appendChild(imgPosterUpcoming)
    }
}

// Manipula os dados assincronos obtidos da API
(async function () {
    upcomingMoviesData = await fetchIDUpcomingMovies()
    imgSlideBoxUpcoming(upcomingMoviesData)
})()