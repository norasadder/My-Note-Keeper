import { useState, useEffect } from "react";
export default function Note({ note }) {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteClicked, setNoteClicked] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);

  function handleClickNote() {
    return setNoteClicked(true);
  }

  function handleClickCancel() {
    return setNoteClicked(false);
  }

  function handleClickClose() {
    return setNoteDeleted(false);
  }

  function handleClickDelete() {
    setNoteDeleted(false);
    fetch(`http://localhost:3001/notes/${note._id}`, {
      method: "DELETE",
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

  function handleClickDeleteNote(e) {
    e.stopPropagation();
    return setNoteDeleted(true);
  }

  function handleChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function handleChangeContent(e) {
    setNoteContent(e.target.value);
  }

  function handleClickDone() {
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
    fetch(`http://localhost:3001/notes/${note._id}`, {
      method: "PUT",
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

  return (
    <>
      {noteClicked && (
        <div className="note-on-click-container">
          <form className="note-on-click">
            <div className="note-on-click-title">
              <input
                type="text"
                defaultValue={note.title}
                onChange={handleChangeTitle}
              ></input>
            </div>
            <div className="note-on-click-content">
              <input
                type="text"
                defaultValue={note.content}
                onChange={handleChangeContent}
              ></input>
            </div>
            <p className="note-on-click-creation-date">{note.creationDate}</p>
            <div className="note-on-click-buttons">
              <button
                className="note-on-click-cancel"
                onClick={handleClickCancel}
              >
                cancel
              </button>
              <button className="note-on-click-done" onClick={handleClickDone}>
                done
              </button>
            </div>
          </form>
        </div>
      )}

      {noteDeleted && (
        <div className="note-on-delete-container">
          <div className="note-on-delete">
            <div className="note-on-delete-title">
              <p>Note Deletion</p>
            </div>
            <div className="note-on-delete-content">
              <p>are you sure you want to delete this note?</p>
            </div>
            <div className="note-on-delete-buttons">
              <button
                className="note-on-delete-close"
                onClick={handleClickClose}
              >
                close
              </button>
              <button
                className="note-on-delete-delete"
                onClick={handleClickDelete}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="note-container" onClick={handleClickNote}>
        <div className="note-title">
          <p>{note.title}</p>
        </div>
        <div className="note-content">
          <p>{note.content}</p>
        </div>
        <p className="note-creation-date">{note.creationDate}</p>
        <a className="delete-note" onClick={handleClickDeleteNote}>
          <img src={require("../images/trash.png")}></img>
        </a>
      </button>
    </>
  );
}
