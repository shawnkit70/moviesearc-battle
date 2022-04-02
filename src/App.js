import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css' ;
import SearchMovie from "./components/SearchMovie";


export default function App() {
  
	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<SearchMovie movie="First" />
			</div>
			<div>
				<SearchMovie movie="Second"/>
			</div>
		</div>
	);
}

