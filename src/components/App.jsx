import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import NotesGrid from "./NotesGrid";
import TodoNote from "./TodoNote";
import MemoPad from "./MemoPad";
import ReminderCard from "./ReminderCard";
import IdeaCard from "./IdeaCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableNote from "./SortableNote";

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem("notes");

		return savedNotes ? JSON.parse(savedNotes) : [];
	});

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredNotes = notes.filter((note) => {
		const query = searchTerm.toLowerCase();

		if (!query) return true;

		//note types
		if (note.type?.toLowerCase().includes(query)) {
			return true;
		}
		// search title
		if (note.title?.toLowerCase().includes(query)) {
			return true;
		}

		// search memo/reminder/idea content
		if (note.content?.toLowerCase().includes(query)) {
			return true;
		}

		// search todo items
		if (note.items?.some((item) => item.text.toLowerCase().includes(query))) {
			return true;
		}

		return false;
		// {
		// 	searchTerm && (
		// 		<X className="clear-search" onClick={() => setSearchTerm("")} />
		// 	);
		// }
	});

	function handleDragEnd(event) {
		const { active, over } = event;

		if (!over || active.id === over.id) {
			return;
		}

		setNotes((prev) => {
			const oldIndex = prev.findIndex((note) => note.id === active.id);

			const newIndex = prev.findIndex((note) => note.id === over.id);

			return arrayMove(prev, oldIndex, newIndex);
		});
	}

	function addNote(type) {
		const washitapes = [
			"/images/washi-1.png",
			"/images/washi-2.png",
			"/images/washi-3.png",
			"/images/washi-4.png",
			"/images/washi-5.png",
			"/images/washi-7.png",
			"/images/washi-8.png",
			"/images/washi-9.png",
			"/images/washi-10.png",
		];

		const randomTape =
			washitapes[Math.floor(Math.random() * washitapes.length)];

		const newNote = {
			id: crypto.randomUUID(),
			type,
			title: "",
			content: "",
			tape: type === "memo" ? randomTape : null,

			items:
				type === "todo"
					? [
							{
								id: crypto.randomUUID(),
								text: "",
								completed: false,
							},
						]
					: [],
		};

		setNotes((prev) => [...prev, newNote]);
	}

	function updateNote(id, field, value) {
		setNotes((prev) =>
			prev.map((note) =>
				note.id === id
					? {
							...note,
							[field]: value,
						}
					: note,
			),
		);
	}

	function updateTodoItem(noteId, itemId, text) {
		setNotes((prev) =>
			prev.map((note) => {
				if (note.id !== noteId) return note;

				return {
					...note,
					items: note.items.map((item) =>
						item.id === itemId ? { ...item, text } : item,
					),
				};
			}),
		);
	}

	function toggleTodoItem(noteId, itemId) {
		setNotes((prev) =>
			prev.map((note) => {
				if (note.id !== noteId) return note;

				return {
					...note,
					items: note.items.map((item) =>
						item.id === itemId
							? {
									...item,
									completed: !item.completed,
								}
							: item,
					),
				};
			}),
		);
	}

	function addTodoItem(noteId) {
		setNotes((prev) =>
			prev.map((note) => {
				if (note.id !== noteId) return note;

				return {
					...note,
					items: [
						...note.items,
						{
							id: crypto.randomUUID(),
							text: "",
							completed: false,
						},
					],
				};
			}),
		);
	}

	function moveNote(fromIndex, toIndex) {
		setNotes((prev) => {
			const updated = [...prev];

			const [moved] = updated.splice(fromIndex, 1);

			updated.splice(toIndex, 0, moved);

			return updated;
		});
	}

	function deleteNote(id) {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	}

	return (
		<div className={`app ${darkMode ? "dark-theme" : ""}`}>
			<Sidebar onCreate={addNote} />
			<div className="content">
				<Header
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					darkMode={darkMode}
					setDarkMode={setDarkMode}
				/>
				<MainContent>
					{/* <button onClick={() => moveNote(0, 1)}>Swap first two notes</button> */}
					{filteredNotes.length === 0 ? (
						<div className="empty-state">
							<h2>🔮 Nothing in the crystal ball...</h2>
							<p>No notes match your search.</p>
						</div>
					) : (
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext items={filteredNotes.map((note) => note.id)}>
								<NotesGrid className="notes-grid">
									{filteredNotes.map((note) => {
										switch (note.type) {
											case "memo":
												return (
													<SortableNote id={note.id}>
														<MemoPad
															key={note.id}
															id={note.id}
															title={note.title}
															content={note.content}
															tape={note.tape}
															onUpdate={updateNote}
															onDelete={deleteNote}
														/>{" "}
													</SortableNote>
												);

											case "todo":
												return (
													<SortableNote id={note.id}>
														<TodoNote
															key={note.id}
															id={note.id}
															title={note.title}
															items={note.items}
															onUpdate={updateNote}
															onDelete={deleteNote}
															onAddItem={addTodoItem}
															onUpdateItem={updateTodoItem}
															onToggleItem={toggleTodoItem}
														/>{" "}
													</SortableNote>
												);

											case "reminder":
												return (
													<SortableNote id={note.id}>
														<ReminderCard
															key={note.id}
															id={note.id}
															title={note.title}
															content={note.content}
															onUpdate={updateNote}
															onDelete={deleteNote}
														/>{" "}
													</SortableNote>
												);

											case "idea":
												return (
													<SortableNote id={note.id}>
														<IdeaCard
															key={note.id}
															id={note.id}
															title={note.title}
															content={note.content}
															onUpdate={updateNote}
															onDelete={deleteNote}
														/>{" "}
													</SortableNote>
												);

											default:
												return null;
										}
									})}
								</NotesGrid>
							</SortableContext>
						</DndContext>
					)}
				</MainContent>
			</div>
			<Footer />
		</div>
	);
}

export default App;
