import React, { useState } from "react";
import { BrushCleaning } from "lucide-react";

function MemoPad(props) {
	const [editing, setEditing] = useState(
		props.title === "" && props.content === "",
	);

	function handleDelete() {
		props.onDelete(props.id);
	}

	function finishEditing() {
		setEditing(false);
	}

	return (
		<div
			className="memo memo-pad"
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setEditing(false);
				}
			}}
		>
			<span className="memo-corner">🌸</span>

			{editing ? (
				<>
					<input
						className="memo-title"
						value={props.title}
						placeholder="Untitled Memo"
						onChange={(e) => props.onUpdate(props.id, "title", e.target.value)}
						onBlur={finishEditing}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								finishEditing();
							}
						}}
					/>

					<textarea
						className="memo-content"
						value={props.content}
						placeholder="Write something..."
						onChange={(e) =>
							props.onUpdate(props.id, "content", e.target.value)
						}
						onBlur={finishEditing}
					/>
				</>
			) : (
				<>
					<h2 onClick={() => setEditing(true)}>
						{props.title || "Untitled Memo"}
					</h2>

					<p onClick={() => setEditing(true)}>
						{props.content || "Click to edit..."}
					</p>
				</>
			)}

			<BrushCleaning
				className="clean"
				onClick={() => props.onDelete(props.id)}
			/>
		</div>
	);
}

export default MemoPad;
