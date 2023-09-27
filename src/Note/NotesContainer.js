import Note from "./Note";
import "./Note.css";
const BACKGROUND_COLOR_PALLETTE = ["#fff", "#f7d5c2", "#f9f9c2"];
const BORDER_COLOR_PALLETTE = ["#e4e4e4", "transparent", "transparent"];
export default function NotesContainer({ notes }) {
  return (
    <div className="notes-container">
      {notes.map((note, index) => (
        <Note
          {...note}
          key={note.title}
          URL={URL}
          backgroundColor={
            BACKGROUND_COLOR_PALLETTE[index % BACKGROUND_COLOR_PALLETTE.length]
          }
          borderColor={
            BORDER_COLOR_PALLETTE[index % BORDER_COLOR_PALLETTE.length]
          }
        />
      ))}
    </div>
  );
}
