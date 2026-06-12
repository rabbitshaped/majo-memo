import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import NotesGrid from "./NotesGrid";
import TodoNote from "./TodoNote";
import MemoPad from "./MemoPad";
import ReminderCard from "./ReminderCard";
import IdeaCard from "./IdeaCard";

function App() {
	const [notes, setNotes] = useState([]);

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

	// function deleteNote(id) {
	// 	setNotes((prevNotes) => {
	// 		return prevNotes.filter((noteItem, index) => {
	// 			return note.id === id;
	// 		});
	// 	});
	// }
	function deleteNote(id) {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	}

	return (
		<div className="app">
			<Sidebar onCreate={addNote} />
			<div className="content">
				<Header />
				<MainContent>
					<NotesGrid className="notes-grid">
						{/* {notes.map((noteItem, index) => (
							<Note
								key={index}
								id={index}
								title={noteItem.title}
								content={noteItem.content}
								onDelete={deleteNote}
							/>
						))} */}
						{/* <p>Notes count: {notes.length}</p> */}
						{notes.map((note, index) => {
							switch (note.type) {
								case "memo":
									return (
										<MemoPad
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											tape={note.tape}
											onUpdate={updateNote}
											onDelete={deleteNote}
										/>
									);

								case "todo":
									return (
										<TodoNote
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											onUpdate={updateNote}
											onDelete={deleteNote}
										/>
									);

								case "reminder":
									return (
										<ReminderCard
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											onUpdate={updateNote}
											onDelete={deleteNote}
										/>
									);

								case "idea":
									return (
										<IdeaCard
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											onUpdate={updateNote}
											onDelete={deleteNote}
										/>
									);

								default:
									return null;
							}
						})}

						<TodoNote />
						<ReminderCard />
						<IdeaCard />
					</NotesGrid>
				</MainContent>
			</div>
			<Footer />
		</div>
	);
}

export default App;
