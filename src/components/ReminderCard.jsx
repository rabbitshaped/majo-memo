import React, { useState } from "react";
import { BrushCleaning } from "lucide-react";

function ReminderCard(props) {
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
			className="memo reminder-card"
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setEditing(false);
				}
			}}
		>
			{/* <img src="/images/ringing-bell.png" className="reminder-corner" alt="" /> */}
			<img src="/images/faint-moon.png" className="memo-corner" alt="" />
			{/* <span className="memo-corner">✨</span> */}

			{editing ? (
				<>
					<input
						className="reminder-title"
						value={props.title}
						placeholder="Untitled Reminder"
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
						className="reminder-content"
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
						{props.title || "Untitled Reminder"}
					</h2>

					<p onClick={() => setEditing(true)}>
						{props.content || "Click to edit..."}
					</p>
				</>
			)}

			<BrushCleaning
				className="clean"
				size={30}
				onClick={() => props.onDelete(props.id)}
			/>
		</div>
	);
}

export default ReminderCard;
