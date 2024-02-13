import React from "react";
import "../styles/SearchResult.css";
import Tracklist from "./Tracklist";

// Definimos el componente SearchResult como una función de flecha que acepta props como argumento
const SearchResult = (props) => {
	return (
		// Renderizamos un contenedor con la clase 'SearchResults' para estilizar el componente
		<div className='SearchResults'>
			{/* Renderizamos el componente Tracklist y le pasamos las siguientes props */}
			<Tracklist
				// Propiedad que contiene los resultados de la búsqueda del usuario
				userSearchResults={props.userSearchResults}
				// Propiedad booleana que indica si se deben mostrar botones de eliminación en la lista de pistas
				isRemoval={false}
				// Función que se ejecuta cuando se agrega una pista a la lista de reproducción
				onAdd={props.onAdd}
			/>
		</div>
	);
};

// Exportamos el componente SearchResult para que pueda ser utilizado en otros archivos
export default SearchResult;
