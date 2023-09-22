import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <div className="header">
      <p className="title">My Note Keeper</p>

      <div className="search-bar">
        <img src={require("./images/search.png")}></img>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        ></input>
      </div>
    </div>
  );
}

function AddNote() {
  const [isVisisble, setIsVisisble] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  function handleOnClick() {
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
    }
  }

  function handleOnChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function handleOnChangeContent(e) {
    setNoteContent(e.target.value);
  }
  return (
    <div>
      {!isVisisble && (
        <div className="add-note-container">
          <button onClick={handleOnClick}>Take a note..</button>
        </div>
      )}
      {isVisisble && (
        <form className="add-note-form" onKeyDown={handleKeyPress}>
          <input
            type="text"
            className="add-note-title"
            placeholder="Title"
            onChange={handleOnChangeTitle}
          ></input>
          <input
            type="text"
            className="add-note-content"
            placeholder="Take a note..."
            onChange={handleOnChangeContent}
          ></input>
          <div className="add-note-close">
            <input type="submit" value="close" onClick={handleOnClick}></input>
          </div>
        </form>
      )}
    </div>
  );
}

function Note({ note }) {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteClicked, setNoteClicked] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);
  function handleOnClickNote() {
    return setNoteClicked(true);
  }

  function handleOnClickCancel() {
    return setNoteClicked(false);
  }

  function handleOnClickDeleteNote(e) {
    e.stopPropagation();
    return setNoteDeleted(true);
  }

  function handleOnChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function handleOnChangeContent(e) {
    setNoteContent(e.target.value);
  }

  function handleOnClickDone() {
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
                onChange={handleOnChangeTitle}
              ></input>
            </div>
            <div className="note-on-click-content">
              <input
                type="text"
                defaultValue={note.content}
                onChange={handleOnChangeContent}
              ></input>
            </div>
            <p className="note-on-click-creation-date">{note.creationDate}</p>
            <div className="note-on-click-buttons">
              <button
                className="note-on-click-cancel"
                onClick={handleOnClickCancel}
              >
                cancel
              </button>
              <button
                className="note-on-click-done"
                onClick={handleOnClickDone}
              >
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
              <button className="note-on-delete-close"> close </button>
              <button className="note-on-delete-delete">delete</button>
            </div>
          </div>
        </div>
      )}

      <button className="note-container" onClick={handleOnClickNote}>
        <div className="note-title">
          <p>{note.title}</p>
        </div>
        <div className="note-content">
          <p>{note.content}</p>
        </div>
        <p className="note-creation-date">{note.creationDate}</p>
        <a className="delete-note" onClick={handleOnClickDeleteNote}>
          <img src={require("./images/trash.png")}></img>
        </a>
      </button>
    </>
  );
}

function NotesContainer({ notes }) {
  let arr = [];
  // const BG_COLORS = ["white,orange,yellow"];
  // const BORDER_COLORS = ["gray,none,none"];

  // const [noteColorsIndex, setNoteColorsIndex] = useState(0);

  notes.forEach((element) => {
    arr.push(<Note note={element} key={element.title} />);
  });
  return <div className="notes-container">{arr}</div>;
}

export default function App() {
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setNotes(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <AddNote />
      {notes && <NotesContainer notes={notes} />}
    </div>
  );
}
