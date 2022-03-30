import React from "react" ; 

export default function SearchMovie ( props ) {
    const [ search, setSearch ] = React.useState("") ;
    const [movies, setMovies] = React.useState([{
        "Title": "Star Wars: Episode IV - A New Hope",
        "Year": "1977",
        "imdbID": "tt0076759",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
        Title: 'Star Wars: Episode VI - Return of the Jedi',
        Year: '1983',
        imdbID: 'tt0086190',
        Type: 'movie',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    }]);

    const getMovieInfo = async()=> {
        const response = await fetch("http://www.omdbapi.com/?s=pokemon&apikey=d4c62730") ;
        const responseJson = await response.json() ;
        console.log(responseJson) ;
        setMovies( responseJson.Search ) ;
        }
    
    const handleSearch = (e) => {
        setSearch(e.target.value) ;
    } 
    
    return (
        <div>
            <input type="text" placeholder="Search your First movie" value={search} onChange={handleSearch}/>
                {movies.map( item => <div>{item.Title}<img alt={ item.Title } src={item.Poster} /></div>)}
        </div>
    )
}