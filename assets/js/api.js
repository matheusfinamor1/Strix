
async function fetchMovieList(){
    const url = 'https://api.themoviedb.org/3/movie/changes?page=1';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGU0NDhjOWFjODQ5NTM2MjA0ZjViNTgyMjU0NjY3OCIsInN1YiI6IjY1OTQzMjFjYTU4OTAyNzExOTk3N2ZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyJ6swHmhFa0siWlfRYEnCPiMnm2QnEaicR_r8ZjrBw'
        }
    };

    const fetching = await fetch(url,options)
    return await fetching.json()
}