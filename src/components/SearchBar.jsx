import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = (props) => {
	// Definimos el estado para almacenar el término de búsqueda
	const [term, setTerm] = useState("");

	// Función para pasar el término de búsqueda al componente padre
	const passTerm = () => {
		props.onSearch(term);
	};

	// Función para manejar el cambio en el input y actualizar el estado del término de búsqueda
	const handleTermChange = (event) => {
		setTerm(event.target.value);
	};

	return (
		// Formulario de búsqueda con clase 'SearchBar' para estilar el componente
		<form className='SearchBar'>
			{/* Input de búsqueda */}
			<input
				id='search'
				className='SearchInput'
				placeholder='Introduce una canción, álbum o artista'
				// Al cambiar el valor del input, se ejecuta la función handleTermChange
				onChange={handleTermChange}
			/>
			{/* Botón de búsqueda */}
			<button className='SearchButton' type='button' onClick={passTerm}>
				Buscar
			</button>
		</form>
	);
};

export default SearchBar;
