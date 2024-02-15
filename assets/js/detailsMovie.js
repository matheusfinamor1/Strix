let idMovieClicked = 0

if(localStorage.getItem('idPopularMovieClicked') === null){
    idMovieClicked = localStorage.getItem('idUpcomingMovieClicked')
}else{
    idMovieClicked = localStorage.getItem('idPopularMovieClicked')
}

loadDetails(idMovieClicked)

async function loadDetails(idMovieClicked){
    try{
        const details = await movieApi.detailsMovie(idMovieClicked)
        console.log(details);
    }catch(error){
        console.log('Erro ao obter detalhes do filme: ',error);
    }
}

localStorage.clear()


