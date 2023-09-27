import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import ExpandedNote from "./ExpandedNote";
import { useContext } from "react";
import { URLContext } from "../Context/URLContext.js";

export default function Note({
  title,
  content,
  creationDate,
  _id,
  backgroundColor,
  borderColor,
}) {
  const URL = useContext(URLContext);
  const [noteExpanded, setNoteExpanded] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);

  function onExpandNote() {
    return setNoteExpanded(true);
  }

  function onDeleteNote(e) {
    e.stopPropagation();
    return setNoteDeleted(true);
  }

  return (
    <>
      {noteExpanded && (
        <ExpandedNote
          setNoteExpanded={setNoteExpanded}
          title={title}
          content={content}
          creationDate={creationDate}
          id={_id}
        />
      )}

      {noteDeleted && (
        <DeleteConfirmation setNoteDeleted={setNoteDeleted} id={_id} />
      )}

      <button
        className="note-container"
        onClick={onExpandNote}
        style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
      >
        <div className="note-title">
          <p>{title}</p>
        </div>
        <div className="note-content">
          <p>{content}</p>
        </div>
        <p className="note-creation-date">{creationDate}</p>
        <a className="delete-note" onClick={onDeleteNote}>
          <img src={require("../images/trash.png")}></img>
        </a>
      </button>
    </>
  );
}
