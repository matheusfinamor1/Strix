const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGU0NDhjOWFjODQ5NTM2MjA0ZjViNTgyMjU0NjY3OCIsInN1YiI6IjY1OTQzMjFjYTU4OTAyNzExOTk3N2ZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyJ6swHmhFa0siWlfRYEnCPiMnm2QnEaicR_r8ZjrBw'
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/'
const MOVIE_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/movie'

// Busca a lista de filme - SEM USO;
// async function fetchMovieList() {
//     const url = `${MOVIE_BASE_URL}/changes?page=1`;

//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: API_KEY
//         }
//     };

//     const fetchingMovieList = await fetch(url, options)
//     return await fetchingMovieList.json()
// }

// Busca os IDs dos filmes atualmente no cinema;
// Retorna a lista de IDs para fetchBackdropMovie();
async function fetchIDNowPlayingMovies() {
    const url = `${MOVIE_BASE_URL}/now_playing?language=pt-US&page=1`
    let listIdNowPlayingMovie = []
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };
    const fetchingNowPlaying = await fetch(url, options)
    const fetchingIdNowPlaying = await fetchingNowPlaying.json()

    if (fetchingIdNowPlaying && fetchingIdNowPlaying.results) {

        for (let i = 0; i < 3; i++) {
            listIdNowPlayingMovie.push(fetchingIdNowPlaying.results[i].id)
        }
        return fetchBackdropMovie(listIdNowPlayingMovie)

    } else {
        console.log("erro ao obter id para os filmes atuais do cinema!");
        return []
    }
}

// Busca os IDs dos filmes populares;
// Retorna a lista de IDs para fetchPostersMovie();
async function fetchIDPopularMovies(){
    const url = `${MOVIE_BASE_URL}/popular`;
    let listIdPopularMovies = []
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };

    const fetchingPopularMovies = await fetch(url, options)
    const fetchingIdPopularMovies = await fetchingPopularMovies.json()

    if (fetchingIdPopularMovies && fetchingIdPopularMovies.results) {

        for (let i = 0; i < 5; i++) {
            listIdPopularMovies.push(fetchingIdPopularMovies.results[i].id)
        }
        return fetchPostersMovie(listIdPopularMovies)

    } else {
        console.log("erro aos obter id dos filmes populares!");
        return []
    }
}

// Busca os IDs dos filmes que estao por vir
// Retorna a lista de IDs para fetchPostersMovie();
async function fetchIDUpcomingMovies(){
    const url = `${MOVIE_BASE_URL}/upcoming`
    let listIdUpcomingMovies = []

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };
    const fetchingUpcomingMovies = await fetch(url,options)
    const fetchIdUpcomingMovies = await fetchingUpcomingMovies.json()

    if(fetchIdUpcomingMovies && fetchIdUpcomingMovies.results){
        for(let i = 0; i< 5; i++){
            listIdUpcomingMovies.push(fetchIdUpcomingMovies.results[i].id)
        }
        return fetchPostersMovie(listIdUpcomingMovies)
    }else{
        console.log("erro aos obter id dos filmes que estão por vir!");
        return []
    }
}

// Busca os posters dos filmes atraves dos IDs recebidos
async function fetchPostersMovie(listIdMovies) {
    const postersPaths = []

    for (const movieId of listIdMovies) {
        const url = `${MOVIE_BASE_URL}${movieId}/images`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        };
        const fetchingPostersMovie = await fetch(url, options)
        const postersData = await fetchingPostersMovie.json()

        if (postersData && postersData.posters && postersData.posters.length > 0) {
            let firstPTFound = false
            for (let i = 0; i < postersData.posters.length; i++) {
                if (postersData.posters[i].iso_639_1 === "pt" && !firstPTFound) {
                    const posterPath = `https://image.tmdb.org/t/p/original${postersData.posters[i].file_path}`;
                    postersPaths.push(posterPath)
                    firstPTFound = true
                }
            }
            if(!firstPTFound){
                console.log("Nenhum elemento com iso_639_1 em pt encontrado para os posters!");
            }

        } else {
            console.log("erro ao obter imagens de posters");
        }
    }
    return postersPaths
}

// Busca os Backdrops(cenarios) dos filmes atraves de seus IDs recebidos;
async function fetchBackdropMovie(listIdMovies) {
    const backdropsPaths = []

    for (const movieId of listIdMovies) {
        const url = `${MOVIE_BASE_URL}${movieId}/images`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        };
        const fetchingBackdropsMovie = await fetch(url, options)
        const backdropsData = await fetchingBackdropsMovie.json()

        if (backdropsData && backdropsData.backdrops && backdropsData.backdrops.length > 0) {
            let firstPTFound = false
            for (let i = 0; i < backdropsData.backdrops.length; i++) {
                if (backdropsData.backdrops[i].iso_639_1 === "pt" && !firstPTFound) {
                    const backdropPath = `https://image.tmdb.org/t/p/original${backdropsData.backdrops[i].file_path}`;
                    backdropsPaths.push(backdropPath)
                    firstPTFound = true
                }
            }
            if(!firstPTFound){
                console.log("Nenhum elemento com iso_639_1 em pt encontrado para os cenarios!");
            }

        } else {
            console.log("erro ao obter imagens para os cenarios!");
        }
    }
    return backdropsPaths
}

// Busca os filmes atraves do input da barra de pesquisa
async function searchMovie(searchInput){
    const params = new URLSearchParams({
        query: searchInput,
        include_adult: false,
        language: 'pt-BR',
        page: 1
    })
    
    const url = `${MOVIE_SEARCH_BASE_URL}?${params.toString()}`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY   
        }
    }

    const fetchingMovie = await fetch(url,options)
    const searchData = await fetchingMovie.json()

    return searchData
}
