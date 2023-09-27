import { useState } from "react";
import "./ExpandedNote.css";
import { useContext } from "react";
import { setNoteContext } from "../Context/setNoteContext.js";
import { URLContext } from "../Context/URLContext.js";
import { GetFetch, PutFetch } from "../Fetch/fetch";

export default function ExpandedNote({
  setNoteExpanded,
  title,
  content,
  creationDate,
  id,
}) {
  const setNotes = useContext(setNoteContext);
  const URL = useContext(URLContext);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  function onClickCancel() {
    return setNoteExpanded(false);
  }

  function onChangeTitle(e) {
    setNoteTitle(e.target.value);
  }

  function onChangeContent(e) {
    setNoteContent(e.target.value);
  }

  async function onClickDone(e) {
    e.preventDefault();
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

    await PutFetch(id, requestData);
    const fetchedData = await GetFetch(URL);
    setNotes(fetchedData);
    setNoteExpanded(false);
  }

  return (
    <div className="expanded-note-container">
      <form className="expanded-note">
        <div className="expanded-note-title">
          <input
            type="text"
            defaultValue={title}
            onChange={onChangeTitle}
          ></input>
        </div>
        <div className="expanded-note-content">
          <input
            type="text"
            defaultValue={content}
            onChange={onChangeContent}
          ></input>
        </div>
        <p className="expanded-note-creation-date">{creationDate}</p>
        <div className="expanded-note-buttons">
          <button className="expanded-note-cancel" onClick={onClickCancel}>
            cancel
          </button>
          <button className="expanded-note-done" onClick={onClickDone}>
            done
          </button>
        </div>
      </form>
    </div>
  );
}
