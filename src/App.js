import { useState, useEffect } from "react";
import { setNoteContext } from "./Context/setNoteContext";
import { URLContext } from "./Context/URLContext";
import Header from "./header/header";
import AddNote from "./Note/AddNote";
import NotesContainer from "./Note/NotesContainer";
import { GetFetch, PostFetch } from "./Fetch/fetch";

export default function App() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function changeSearchVal(newVal) {
    setSearchValue(newVal);
  }

  const URL =
    searchValue === ""
      ? "http://localhost:3001/notes"
      : `http://localhost:3001/notes/${encodeURIComponent(searchValue)}`;

  const fetchData = async () => {
    setIsLoading(true);
    const fetchedData = await GetFetch(URL);
    setNotes(fetchedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  const handleNewNoteAdd = async (note) => {
    await PostFetch(note);
    const fetchedData = await GetFetch(URL);
    setNotes(fetchedData);
  };

  return (
    <div>
      <setNoteContext.Provider value={setNotes}>
        <URLContext.Provider value={URL}>
          <Header changeSearchVal={changeSearchVal} />
          <AddNote onAddNewNote={handleNewNoteAdd} />
          {isLoading
            ? "Loading ..."
            : notes && <NotesContainer notes={notes} />}
        </URLContext.Provider>
      </setNoteContext.Provider>
    </div>
  );
}
