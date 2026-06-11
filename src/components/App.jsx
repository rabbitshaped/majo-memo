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
		const newNote = {
			id: crypto.randomUUID(),
			type,
			title: "",
			content: "",
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
											onUpdate={updateNote}
											onDelete={deleteNote}
										/>
									);

								case "todo":
									return (
										<TodoNote
											key={index}
											id={index}
											title={note.title}
											content={note.content}
											onDelete={deleteNote}
										/>
									);

								case "reminder":
									return (
										<ReminderCard
											key={index}
											id={index}
											title={note.title}
											content={note.content}
											onDelete={deleteNote}
										/>
									);

								case "idea":
									return (
										<IdeaCard
											key={index}
											id={index}
											title={note.title}
											content={note.content}
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
