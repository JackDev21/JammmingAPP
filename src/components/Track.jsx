import React from "react";
import "../styles/Track.css";

const Track = (props) => {
	// Función para renderizar la acción del botón (+ o -) dependiendo del valor de isRemoval
	const renderAction = () => {
		if (props.isRemoval) {
			// Si isRemoval es true, el botón será '-' para eliminar la pista de la lista de reproducción
			return (
				<button className='Track-action' onClick={passTrackToRemove}>
					-
				</button>
			);
		} else {
			// Si isRemoval es false, el botón será '+' para agregar la pista a la lista de reproducción
			return (
				<button className='Track-action' onClick={passTrack}>
					+
				</button>
			);
		}
	};

	// Función para pasar la pista al componente padre cuando se hace clic en el botón de agregar
	const passTrack = () => {
		props.onAdd(props.track);
	};

	// Función para pasar la pista al componente padre cuando se hace clic en el botón de eliminar
	const passTrackToRemove = () => {
		props.onRemove(props.track);
	};

	return (
		// Div con clase 'Track' para estilar el componente
		<div className='Track'>
			{/* Div para mostrar la información de la pista */}
			<div className='Track-information'></div>
			{/* Título de la pista */}
			<h3>{props.track.name}</h3>
			{/* Artista y álbum de la pista */}
			<p>
				{props.track.artist} | {props.track.album}
			</p>
			{/* Renderizamos la acción del botón (+ o -) dependiendo de isRemoval */}
			{renderAction()}
		</div>
	);
};

export default Track;
