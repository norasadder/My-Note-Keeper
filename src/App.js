import { useState, useEffect } from "react";
import Header from "./header/header";
import AddNote from "./Note/AddNote";
import NotesContainer from "./Note/NotesContainer";

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
