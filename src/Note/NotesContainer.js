import Note from "./Note";
import "./Note.css";
export default function NotesContainer({ notes }) {
  let arr = [];
  notes.forEach((element) => {
    arr.push(<Note note={element} key={element.title} />);
  });
  return <div className="notes-container">{arr}</div>;
}
