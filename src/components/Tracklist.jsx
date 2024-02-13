import React from "react";
import "../styles/Tracklist.css";
import Track from "./Track";

const Tracklist = (props) => {
	return (
		<div className='Tracklist'>
			{props.userSearchResults.map((track) => (
				<Track
					track={track}
					key={track.id}
					isRemoval={props.isRemoval}
					onAdd={props.onAdd}
					onRemove={props.onRemove}
				/>
			))}
		</div>
	);
};

export default Tracklist;
