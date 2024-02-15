const idPopularMovieClicked = localStorage.getItem('idPopularMovieClicked')
const idUpcomingMovieClicked = localStorage.getItem('idUpcomingMovieClicked')

// verifica qual variavel possui valor para se trabalhar
if (idPopularMovieClicked === null){
    console.log(idUpcomingMovieClicked);
}else{
    console.log(idPopularMovieClicked);
}
localStorage.clear()
