import "./AddNote.css";
import { useState } from "react";
export default function AddNote({ onAddNewNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  function onKeyPress(event) {
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

  function onChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function onChangeContent(e) {
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
        <form className="add-note-form" onKeyDown={onKeyPress}>
          <input
            type="text"
            className="add-note-title"
            placeholder="Title"
            onChange={onChangeTitle}
          ></input>
          <input
            type="text"
            className="add-note-content"
            placeholder="Take a note..."
            onChange={onChangeContent}
          ></input>
          <div className="add-note-close">
            <input type="submit" value="close" onClick={toggleExpand}></input>
          </div>
        </form>
      )}
    </div>
  );
}
