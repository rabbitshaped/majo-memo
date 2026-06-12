import React from "react";
import { Moon } from "lucide-react";
import { Astroid } from "lucide-react";
import { AlarmClock } from "lucide-react";
import { Sparkles } from "lucide-react";

function Sidebar(props) {
	return (
		<aside className="sidebar">
			<img id="hat" src="./images/witch-hat.png" alt="witch hat logo" />
			{/* <button className="sidebar-btn new memo-btn">
				<Moon size={20} /> New Memo
			</button>
			<button className="sidebar-btn new todo-btn">
				<Astroid size={20} /> New Todo
			</button>
			<button className="sidebar-btn new reminder-btn">
				<AlarmClock size={20} /> New Reminder
			</button>
			<button className="sidebar-btn new idea-btn">
				<Sparkles size={20} /> New Idea
			</button> */}

			{/* <nav className="sidebar-nav">
				<button>📖 All Notes</button>
				<button>⭐ Favorites</button>
				<button>🌸 Ideas</button>
				<button>🪄 Spells</button>
			</nav> */}
			{/* <div className="sidebar-footer">
				<p>Moonlit thoughts and tiny reminders.</p>
			</div> */}
			<button
				className="sidebar-btn new memo-btn"
				onClick={() => props.onCreate("memo")}
			>
				<Moon size={20} />
				New Memo
			</button>
			<button
				className="sidebar-btn new todo-btn"
				onClick={() => props.onCreate("todo")}
			>
				<Astroid size={20} />
				New Todo
			</button>
			<button
				className="sidebar-btn new reminder-btn"
				onClick={() => props.onCreate("reminder")}
			>
				<AlarmClock size={20} />
				New Reminder
			</button>
			<button
				className="sidebar-btn new idea-btn"
				onClick={() => props.onCreate("idea")}
			>
				<Sparkles size={20} />
				New Idea
			</button>
			<img src="/images/star-line.png" style={{ margin: 30 }} alt="" />
			{/* Some more buttons */}
		</aside>
	);
}

export default Sidebar;
