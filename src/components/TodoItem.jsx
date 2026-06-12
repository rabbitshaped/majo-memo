import React, { useState } from "react";
import { Check } from "lucide-react";

function TodoItem({ item, onToggle, onChange }) {
	const [editing, setEditing] = useState(item.text === "");

	return (
		<li className="todo-item">
			<button
				className={`todo-checkbox ${item.completed ? "completed" : ""}`}
				onClick={onToggle}
			>
				{item.completed && <Check size={14} />}
			</button>

			{editing ? (
				<input
					className="todo-edit"
					value={item.text}
					autoFocus
					placeholder="New task"
					onChange={(e) => onChange(e.target.value)}
					onBlur={() => setEditing(false)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setEditing(false);
						}
					}}
				/>
			) : (
				<span
					className={`todo-text ${item.completed ? "completed-text" : ""}`}
					onClick={() => setEditing(true)}
				>
					{item.text || "New task"}
				</span>
			)}
		</li>
	);
}

export default TodoItem;
