import { useState } from "react";
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
  function handleOnClick() {
    setIsVisisble(!isVisisble);
  }
  return (
    <div>
      {!isVisisble && (
        <div className="add-note-container">
          <button onClick={handleOnClick}>Take a note..</button>
        </div>
      )}
      {isVisisble && (
        <form className="add-note-form">
          <input
            type="text"
            className="add-note-title"
            placeholder="Title"
          ></input>
          <input
            type="text"
            className="add-note-content"
            placeholder="Take a note..."
          ></input>
          <div className="add-note-close">
            <input type="submit" value="close" onClick={handleOnClick}></input>
          </div>
        </form>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Header /> ;
      <AddNote />;
    </div>
  );
}
