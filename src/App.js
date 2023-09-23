import { useState, useEffect } from "react";
import "./App.css";

function Header({ changeSearchVal }) {
  function handleChange(event) {
    changeSearchVal(event.target.value);
  }
  return (
    <div className="header">
      <p className="title">My Note Keeper</p>

      <div className="search-bar">
        <img src={require("./images/search.png")}></img>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
}

function AddNote() {
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

function Note({ note }) {
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
          <img src={require("./images/trash.png")}></img>
        </a>
      </button>
    </>
  );
}

function NotesContainer({ notes }) {
  let arr = [];
  notes.forEach((element) => {
    arr.push(<Note note={element} key={element.title} />);
  });
  return <div className="notes-container">{arr}</div>;
}

export default function App() {
  const [notes, setNotes] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  function changeSearchVal(newVal) {
    setSearchValue(newVal);
  }

  const URL =
    searchValue === ""
      ? "http://localhost:3001/notes"
      : `http://localhost:3001/notes/${encodeURIComponent(searchValue)}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL, {
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
  }, [searchValue]);

  return (
    <div>
      <Header changeSearchVal={changeSearchVal} />
      <AddNote />
      {notes && <NotesContainer notes={notes} />}
    </div>
  );
}
