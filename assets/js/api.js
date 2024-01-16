const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGU0NDhjOWFjODQ5NTM2MjA0ZjViNTgyMjU0NjY3OCIsInN1YiI6IjY1OTQzMjFjYTU4OTAyNzExOTk3N2ZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyJ6swHmhFa0siWlfRYEnCPiMnm2QnEaicR_r8ZjrBw'
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/'

// Busca a lista de filme - SEM USO;
async function fetchMovieList() {
    const url = `${MOVIE_BASE_URL}/changes?page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };

    const fetchingMovieList = await fetch(url, options)
    return await fetchingMovieList.json()
}

// Busca lista de filmes atualmente no cinema;
// Retorna a lista de IDs desses filmes para fetchBackdropMovie();
async function fetchNowPlaying() {
    const url = `${MOVIE_BASE_URL}/now_playing?language=pt-US&page=1`
    let listIdMovie = []
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
            listIdMovie.push(fetchingIdNowPlaying.results[i].id)
        }
        return fetchBackdropMovie(listIdMovie)

    } else {
        console.log("erro aos obter id");
        return []
    }
}
// Busca os Backdrops(cenarios) dos filmes no cinema atraves de seus IDs recebidos;
async function fetchBackdropMovie(listIdMovie) {
    const backdropsPaths = []

    for (const movieId of listIdMovie) {
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
                console.log("Nenhum elemento com iso_639_1 em pt encontrado!");
            }

        } else {
            console.log("erro ao obter imagens");
        }
    }
    return backdropsPaths
}

async function fetchPopularMovies(){
    const url = `${MOVIE_BASE_URL}/popular`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };

    const fetchingPopularMovies = await fetch(url, options)
    return await fetchingPopularMovies.json();
}