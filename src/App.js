import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css' ;
import SearchMovie from "./components/SearchMovie";

const URL = "http://www.omdbapi.com/?s=pokemon&apikey=d4c62730" ;

export default function App() {
  
	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<SearchMovie url = {URL} />
			</div>
		</div>
	);
}

