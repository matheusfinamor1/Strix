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
// Retorna a lista de IDs desses filmes para fetchImagesMovie();
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
        return fetchPostersMovie(listIdMovie)

    } else {
        console.log("erro aos obter id");
        return []
    }
}
// Busca os Posters dos filmes no cinema atraves de seus IDs recebidos;
async function fetchPostersMovie(listIdMovie) {
    const postersPaths = []

    for (const movieId of listIdMovie) {
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
            const posterPath = `https://image.tmdb.org/t/p/original${postersData.posters[0].file_path}`;
            postersPaths.push(posterPath)
        } else {
            console.log("erro ao obter imagens");
        }
    }
    return postersPaths
}