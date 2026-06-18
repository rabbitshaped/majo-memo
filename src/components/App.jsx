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
import {
	DndContext,
	pointerWithin,
	DragOverlay,
	PointerSensor,
	KeyboardSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableNote from "./SortableNote";

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	const [activeId, setActiveId] = useState(null);
	const [recentlyAddedId, setRecentlyAddedId] = useState(null);
	const [deletingNoteIds, setDeletingNoteIds] = useState(() => new Set());

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor),
	);

	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem("notes");

		return savedNotes ? JSON.parse(savedNotes) : [];
	});

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("all");

	const filteredNotes = notes.filter((note) => {
		const query = searchTerm.toLowerCase();

		if (activeFilter !== "all" && note.type !== activeFilter) {
			return false;
		}

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
	});

	function addNote(type) {
		const washitapes = [
			"/images/washi-1.png",
			"/images/washi-2.png",
			"/images/washi-3.png",
			"/images/washi-4.png",
			"/images/washi-7.png",
			"/images/washi-8.png",
			"/images/washi-9.png",
		];
		const darkWashitapes = [
			"/images/washi-5.png",
			"/images/washi-6.png",
			"/images/washi-10.png",
			"/images/washi-11.png",
		];

		const randomTape =
			washitapes[Math.floor(Math.random() * washitapes.length)];
		const randomDarkTape =
			darkWashitapes[Math.floor(Math.random() * darkWashitapes.length)];

		const newNote = {
			id: crypto.randomUUID(),
			type,
			title: "",
			content: "",
			tape: type === "memo" ? randomTape : null,
			darkTape: type === "memo" ? randomDarkTape : null,

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
		setRecentlyAddedId(newNote.id);
		window.setTimeout(() => setRecentlyAddedId(null), 550);
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

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function handleDragCancel() {
		setActiveId(null);
	}

	function handleDragEnd(event) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setNotes((prev) => {
				const oldIndex = prev.findIndex((note) => note.id === active.id);

				const newIndex = prev.findIndex((note) => note.id === over.id);

				return arrayMove(prev, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	}

	const activeNote = notes.find((note) => note.id === activeId);

	function DragPreview({ note }) {
		const rotation = {
			memo: "-2deg",
			todo: "1deg",
			reminder: "2deg",
			idea: "-1deg",
		};

		switch (note.type) {
			case "memo":
				// return (
				// 	<div
				// 		className="memo memo-pad drag-preview"
				// 		style={{
				// 			"--tape-image": `url(${note.tape})`,
				// 		}}
				// 	>
				// 		<h2>{note.title || "Untitled Memo"}</h2>
				// 		<p>{note.content || "..."}</p>
				// 	</div>
				return (
					<div
						className="drag-preview-wrapper"
						style={{
							transform: `rotate(${rotation[note.type]})`,
						}}
					>
						<MemoPad
							id={note.id}
							title={note.title}
							content={note.content}
							tape={note.tape}
							darkTape={note.darkTape}
							preview={true}
						/>
					</div>
				);

			case "todo":
				return (
					<TodoNote title={note.title} items={note.items} preview={true} />
				);

			case "reminder":
				return (
					<ReminderCard
						title={note.title}
						content={note.content}
						preview={true}
					/>
				);

			case "idea":
				return (
					<IdeaCard title={note.title} content={note.content} preview={true} />
				);

			default:
				return null;
		}
	}

	function deleteNote(id) {
		setDeletingNoteIds((prev) => new Set(prev).add(id));

		window.setTimeout(() => {
			setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
			setDeletingNoteIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}, 220);
	}

	return (
		<div className={`app ${darkMode ? "dark-theme" : ""}`}>
			<Sidebar
				onCreate={addNote}
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
			/>
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
							<h2>Nothing in the crystal ball...</h2>
							<p>No notes match your search.</p>
						</div>
					) : (
						<DndContext
							sensors={sensors}
							collisionDetection={pointerWithin}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							onDragCancel={handleDragCancel}
						>
							<SortableContext items={filteredNotes.map((note) => note.id)}>
								<NotesGrid className="notes-grid">
									{filteredNotes.map((note) => {
										const isNew = note.id === recentlyAddedId;
										const isDeleting = deletingNoteIds.has(note.id);

										switch (note.type) {
											case "memo":
												return (
													<SortableNote
														key={note.id}
														id={note.id}
														type={note.type}
														isNew={isNew}
														isDeleting={isDeleting}
													>
														<MemoPad
															id={note.id}
															title={note.title}
															content={note.content}
															tape={note.tape}
															darkTape={note.darkTape}
															onUpdate={updateNote}
															onDelete={deleteNote}
														/>{" "}
													</SortableNote>
												);

											case "todo":
												return (
													<SortableNote
														key={note.id}
														id={note.id}
														type={note.type}
														isNew={isNew}
														isDeleting={isDeleting}
													>
														<TodoNote
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
													<SortableNote
														key={note.id}
														id={note.id}
														type={note.type}
														isNew={isNew}
														isDeleting={isDeleting}
													>
														<ReminderCard
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
													<SortableNote
														key={note.id}
														id={note.id}
														type={note.type}
														isNew={isNew}
														isDeleting={isDeleting}
													>
														<IdeaCard
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
							<DragOverlay>
								{activeNote ? (
									<div className="drag-preview-wrapper">
										<DragPreview note={activeNote} />
									</div>
								) : null}
							</DragOverlay>
						</DndContext>
					)}
				</MainContent>
			</div>
			<Footer />
		</div>
	);
}

export default App;
