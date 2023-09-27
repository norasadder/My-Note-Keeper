import { DeleteFetch, GetFetch } from "../Fetch/fetch";
import { useContext } from "react";
import { setNoteContext } from "../Context/setNoteContext.js";
import { URLContext } from "../Context/URLContext.js";
import "./DeleteConfirmation.css";
export default function DeleteConfirmation({ setNoteDeleted, id }) {
  const setNotes = useContext(setNoteContext);
  const URL = useContext(URLContext);
  function onClose() {
    return setNoteDeleted(false);
  }

  async function onDelete() {
    DeleteFetch(id);
    const fetchedData = await GetFetch(URL);
    setNotes(fetchedData);
  }

  return (
    <div className="note-on-delete-container">
      <div className="note-on-delete">
        <div className="note-on-delete-title">
          <p>Note Deletion</p>
        </div>
        <div className="note-on-delete-content">
          <p>are you sure you want to delete this note?</p>
        </div>
        <div className="note-on-delete-buttons">
          <button className="note-on-delete-close" onClick={onClose}>
            close
          </button>
          <button className="note-on-delete-delete" onClick={onDelete}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
