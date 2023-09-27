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
    await DeleteFetch(id);
    const fetchedData = await GetFetch(URL);
    setNotes(fetchedData);
    setNoteDeleted(false);
  }

  return (
    <div className="delete-confirmation-container">
      <div className="delete-confirmation">
        <div className="delete-confirmation-title">
          <p>Note Deletion</p>
        </div>
        <div className="delete-confirmation-content">
          <p>are you sure you want to delete this note?</p>
        </div>
        <div className="delete-confirmation-buttons">
          <button className="delete-confirmation-close" onClick={onClose}>
            close
          </button>
          <button className="delete-confirmation-delete" onClick={onDelete}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
