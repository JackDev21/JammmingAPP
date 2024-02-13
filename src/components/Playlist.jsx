import React from "react";
import "../styles/Playlist.css";
import Tracklist from "./Tracklist";

const Playlist = (props) => {
	const handleNameChange = ({ target }) => {
		props.onNameChange(target.value);
	};

	return (
		<div className='Playlist'>
			<input
				id='playlist'
				className='Playlist-input'
				defaultValue={"New Playlist"}
				onChange={handleNameChange}
			/>
			<Tracklist
				userSearchResults={props.playlistTracks || []}
				onRemove={props.onRemove}
				isRemoval={true}
			/>
			<button className='btn-save' type='button' onClick={props.onSave}>
				Guardar Lista en Spotify
			</button>
		</div>
	);
};

export default Playlist;
