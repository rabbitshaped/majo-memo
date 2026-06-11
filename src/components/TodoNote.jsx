import React, { useState } from "react";
import { BrushCleaning } from "lucide-react";

function TodoNote() {
	return (
		<div className="memo todo-note">
			{/* <span className="memo-corner">🌙</span> */}

			<h2>Today's Tasks</h2>

			<ul className="todo-list">
				<li>☐ Finish React project</li>
				<li>☑ Buy strawberries</li>
				<li>☐ Practice Japanese</li>
				<li>☐ Water plants</li>
			</ul>
		</div>
	);
}

export default TodoNote;
