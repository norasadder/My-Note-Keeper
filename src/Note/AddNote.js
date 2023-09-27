import "./AddNote.css";
import { useState } from "react";
export default function AddNote({ onAddNewNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  function handleKeyPress(event) {
    if (event.key !== "Enter") return;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentDate = `${month}/${day}/${year}`;

    const requestData = {
      title: noteTitle,
      content: noteContent,
      creationDate: currentDate,
    };
    onAddNewNote(requestData);
  }

  function handleChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function handleChangeContent(e) {
    setNoteContent(e.target.value);
  }
  return (
    <div>
      {!isExpanded && (
        <div className="add-note-container">
          <button onClick={toggleExpand}>Take a note..</button>
        </div>
      )}
      {isExpanded && (
        <form className="add-note-form" onKeyDown={handleKeyPress}>
          <input
            type="text"
            className="add-note-title"
            placeholder="Title"
            onChange={handleChangeTitle}
          ></input>
          <input
            type="text"
            className="add-note-content"
            placeholder="Take a note..."
            onChange={handleChangeContent}
          ></input>
          <div className="add-note-close">
            <input type="submit" value="close" onClick={toggleExpand}></input>
          </div>
        </form>
      )}
    </div>
  );
}
