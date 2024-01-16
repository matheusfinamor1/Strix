(async function(){
    const popularMoviesData = await fetchPopularMovies()
    console.log(popularMoviesData);
})()