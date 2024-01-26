const sliderUpcomingContent = document.getElementById('content-upcoming')
const slideBoxesUpcoming = sliderUpcomingContent.querySelectorAll('.slide-box-upcoming')

// Manipula os eventos de clique nos botoes de "prev" e "next" image do slider
document.addEventListener('DOMContentLoaded', function(){
    var nextButton = document.getElementById('next-slider')
    var prevButton = document.getElementById('prev-slider')
    var sliderContent = document.getElementById('content-upcoming')
    var image = document.querySelector(".content-imgs-upcoming span.slide-box-upcoming");

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
