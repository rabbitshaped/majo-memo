import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
	function handleClick() {
		props.onDelete(props.id);
	}

	return (
		<div className={`memo ${props.note.type}`}>
			<div className="memo-corner">🌙</div>

			<h2>{props.title}</h2>

			<p>{props.content}</p>

			<button className="delete-btn" onClick={handleClick}>
				×
			</button>
		</div>
	);
}

export default Note;
