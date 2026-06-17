import React, { useState } from "react";
import { BrushCleaning } from "lucide-react";

function MemoPad(props) {
	const [editing, setEditing] = useState(
		props.title === "" && props.content === "",
	);

	function finishEditing() {
		setEditing(false);
	}

	if (props.preview) {
		return (
			<div
				className="memo memo-pad drag-preview"
				style={{
					"--tape-image": `url(${props.tape})`,
					"--dark-tape-image": `url(${props.darkTape || props.tape})`,
				}}
			>
				<img src="/images/faint-moon.png" className="memo-corner" alt="" />
				<h2>{props.title || "Untitled Memo"}</h2>
				<p>{props.content}</p>
			</div>
		);
	}

	return (
		<div
			className="memo memo-pad"
			style={{
				"--tape-image": `url(${props.tape})`,
				"--dark-tape-image": `url(${props.darkTape || props.tape})`,
			}}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setEditing(false);
				}
			}}
		>
			{/* <span className="memo-corner">🌸</span> */}
			<img src="/images/faint-moon.png" className="memo-corner" alt="" />

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
				size={30}
				onClick={() => props.onDelete(props.id)}
			/>
		</div>
	);
}

export default MemoPad;
