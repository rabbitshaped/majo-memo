import React, { useState } from "react";
import { BrushCleaning } from "lucide-react";
import TodoItem from "./TodoItem";

function TodoNote(props) {
	const [editingTitle, setEditingTitle] = useState(props.title === "");

	return (
		<div className="memo todo-note">
			{editingTitle ? (
				<input
					className="todo-title"
					value={props.title}
					placeholder="Untitled Todo"
					onChange={(e) => props.onUpdate(props.id, "title", e.target.value)}
					onBlur={() => setEditingTitle(false)}
				/>
			) : (
				<h2 onClick={() => setEditingTitle(true)}>
					{props.title || "Untitled Todo"}
				</h2>
			)}

			<ul className="todo-list">
				{props.items?.map((item) => (
					<TodoItem
						key={item.id}
						item={item}
						onToggle={() => props.onToggleItem(props.id, item.id)}
						onChange={(text) => props.onUpdateItem(props.id, item.id, text)}
					/>
				))}
			</ul>

			<button className="add-task" onClick={() => props.onAddItem(props.id)}>
				+ Add another task
			</button>

			<BrushCleaning
				className="clean"
				size={30}
				onClick={() => props.onDelete(props.id)}
			/>
		</div>
	);
}

export default TodoNote;
