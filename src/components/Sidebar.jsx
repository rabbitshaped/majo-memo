import React from "react";
import { AlarmClock, Astroid, ListFilter, Moon, Sparkles } from "lucide-react";

function Sidebar(props) {
	const filters = [
		{ id: "all", label: "All Notes", icon: ListFilter },
		{ id: "memo", label: "Memos", icon: Moon },
		{ id: "todo", label: "Todos", icon: Astroid },
		{ id: "reminder", label: "Reminders", icon: AlarmClock },
		{ id: "idea", label: "Ideas", icon: Sparkles },
	];

	return (
		<aside className="sidebar">
			<img id="book" src="./images/diary.png" alt="witch diary" />

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

			<nav className="filter-nav" aria-label="Filter notes">
				{filters.map(({ id, label, icon: Icon }) => (
					<button
						key={id}
						type="button"
						className={`filter-btn ${props.activeFilter === id ? "active" : ""}`}
						onClick={() => props.onFilterChange(id)}
						aria-pressed={props.activeFilter === id}
					>
						<Icon size={18} />
						{label}
					</button>
				))}
			</nav>
		</aside>
	);
}

export default Sidebar;
