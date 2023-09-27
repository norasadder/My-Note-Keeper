import Note from "./Note";
import "./Note.css";
const COLOR_PALLETTE = ["white", "#f7d5c2", "#f9f9c2"];
const BORDER_PALLETTE = ["#e4e4e4", "transparent", "transparent"];
export default function NotesContainer({ notes }) {
  return (
    <div className="notes-container">
      {notes.map((note, index) => (
        <Note
          {...note}
          key={note.title}
          URL={URL}
          backgroundColor={COLOR_PALLETTE[index % COLOR_PALLETTE.length]}
          borderColor={BORDER_PALLETTE[index % BORDER_PALLETTE.length]}
        />
      ))}
    </div>
  );
}
