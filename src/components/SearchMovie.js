import React from "react" ; 
import "../App.css" ;
import Dropdown from 'react-bootstrap/Dropdown'

export default function SearchMovie ( props ) {
    const [ search, setSearch ] = React.useState("") ;
    const [ movies, setMovies ] = React.useState([{
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

    const getMovieInfo = async( query )=> {
        
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=d4c62730`) ;
        const responseJson = await response.json() ;
        console.log(responseJson) ;
        if( responseJson.Response === "True" ){
            setMovies(responseJson.Search) ;
        }
        else{
            setMovies( movies ) ;
        }
        }
     React.useEffect(()=>{
         const data = setTimeout( ()=> getMovieInfo( search ) , 500) ;
         return () => clearTimeout(data);
     } , [search])
    
    return (
        <div>
            <input type="text" placeholder="Search your First movie" 
            value={search} onChange={ event => setSearch(event.target.value)}/>
            <div className="movieList">
            <Dropdown.Menu show> {movies
            .map( item => <Dropdown.Item eventKey={item.imdbID} onClick={ event => console.log(event) }>
            <img alt={ item.Title } src={item.Poster} />
            <h3>{item.Title}</h3></Dropdown.Item>)}</Dropdown.Menu>
            </div>
        </div>
    )
}