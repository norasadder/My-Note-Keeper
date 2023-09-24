import "./AddNote.css";
import { useState, useEffect } from "react";
export default function AddNote() {
  const [isVisisble, setIsVisisble] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  function handleClick() {
    setIsVisisble(!isVisisble);
  }

  function handleKeyPress(event) {
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

    if (event.key === "Enter") {
      console.log("Enter key pressed");
      fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      window.location.reload();
    }
  }

  function handleChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function handleChangeContent(e) {
    setNoteContent(e.target.value);
  }
  return (
    <div>
      {!isVisisble && (
        <div className="add-note-container">
          <button onClick={handleClick}>Take a note..</button>
        </div>
      )}
      {isVisisble && (
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
            <input type="submit" value="close" onClick={handleClick}></input>
          </div>
        </form>
      )}
    </div>
  );
}
