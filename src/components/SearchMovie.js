import React from "react" ; 
import "../App.css" ;
import Dropdown from 'react-bootstrap/Dropdown' ;

export default function SearchMovie ( props ) {
    const [ hide , setHide ] = React.useState(false) ;
    const [ search, setSearch ] = React.useState("") ;
    const [ movies, setMovies ] = React.useState([]);

    const [movie , setMovie ] = React.useState([]) ;

    const getMoviesInfo = async( query )=> {
        
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=d4c62730`) ;
        const responseJson = await response.json() ;
        console.log(responseJson) ;
        if( responseJson.Response === "True" ){
            const filteredMovie = Array.from(new Set(responseJson.Search.map(a => a.imdbID)))
            .map(id => {
            return responseJson.Search.find(a => a.imdbID === id)
            })
            console.log(filteredMovie) ;
            setMovies(filteredMovie) ;
            setHide( prevValue => !prevValue ) ;
        }
        else{
            setMovies( movies ) ;
        }
        }

    const getMovieInfo = async( id ) =>{
            const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=d4c62730`)
            const selectedMovie = await response.json() ;
            console.log( selectedMovie ); 
            const {Title,Year,Rated,Awards,BoxOffice,imdbRating,imdbVotes} = selectedMovie ;
            setMovie( prevValue => ({...prevValue , Title , Year , Rated , Awards , BoxOffice , imdbRating , imdbVotes } ) ) ;
            console.log(movie) ;
        }
    
    const handleValue = (e) => {
      const movId = e.target.children[1].defaultValue ;
      getMovieInfo( movId ) ;
      setMovies([]) ;
      setHide( prevValue => !prevValue ) ;
    }
    
    
    React.useEffect(()=>{
         const data = setTimeout( ()=> getMoviesInfo( search ) , 500) ;
         return () => clearTimeout(data);
     } , [ search ])

     
    
    return (
        <div>
            <input type="text" placeholder={`Search your ${props.movie} movie`}
            value={search} onChange={ event => setSearch(event.target.value)}/>
            <div className="movieList" style={{display: hide ? "block" :"none"}}>
            <Dropdown.Menu show > {movies
            .map( item => <Dropdown.Item onClick={handleValue} >
            <img alt={ item.Title } src={ item.Poster } />
            <input hidden defaultValue={item.imdbID} />
            <h3>{item.Title}</h3></Dropdown.Item>)}</Dropdown.Menu>
            </div>
            <div>
        {Object.entries(movie).map(([key, value]) =>
            <p>{key} : {value}</p>
        )}
    </div>
        </div>
    )
}