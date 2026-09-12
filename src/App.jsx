import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import StreamList from "./components/StreamList";
import About from "./components/About";
import MovieSearch from "./components/MovieSearch";

function App() {
  // Stores what the user is currently typing
  const [title, setTitle] = useState("");

  // Starting titles used only when localStorage does not have a saved list
  const defaultStreamList = [
    {
      id: 1,
      title: "Stranger Things",
      type: "TV Series",
      completed: false,
    },
    {
      id: 2,
      title: "The Batman",
      type: "Movie",
      completed: false,
    },
    {
      id: 3,
      title: "The Last of Us",
      type: "TV Series",
      completed: false,
    },
  ];

  // Loads the saved StreamList from localStorage when the app starts
  const [streamList, setStreamList] = useState(() => {
    const savedList = localStorage.getItem("streamList");

    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);

        if (Array.isArray(parsedList)) {
          return parsedList;
        }

        console.error("Saved StreamList is not an array; using defaults.");
      } catch (error) {
        console.error("Unable to load StreamList from localStorage:", error);
      }
    }

    return defaultStreamList;
  });

  // Saves the StreamList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(streamList));
  }, [streamList]);

  // Adds a new movie or show
  const addToList = () => {
    if (title.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      type: "Movie / Show",
      completed: false,
    };

    setStreamList([...streamList, newItem]);

    // Clears the input after submitting
    setTitle("");
  };

  // Deletes a movie or show
  const removeFromList = (id) => {
    setStreamList(
      streamList.filter((item) => item.id !== id)
    );
  };

  // Marks a movie or show as watched or unwatched
  const toggleComplete = (id) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Updates a title when the user edits it
  const updateTitle = (id, newTitle) => {
    if (newTitle.trim() === "") {
      return;
    }

    setStreamList(
      streamList.map((item) =>
        item.id === id
          ? { ...item, title: newTitle.trim() }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <AddMovie
                  title={title}
                  setTitle={setTitle}
                  addToList={addToList}
                />

                <StreamList
                  streamList={streamList}
                  removeFromList={removeFromList}
                  toggleComplete={toggleComplete}
                  updateTitle={updateTitle}
                />
              </>
            }
          />

          {/* My List Page */}
          <Route
            path="/my-list"
            element={
              <StreamList
                streamList={streamList}
                removeFromList={removeFromList}
                toggleComplete={toggleComplete}
                updateTitle={updateTitle}
              />
            }
          />

          {/* Movie Search Page */}
          <Route
            path="/movie-search"
            element={<MovieSearch />}
          />

          {/* About Page */}
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>

      <footer>
        <p>StreamList • EZTechMovie</p>
        <p>Your movies. Your shows. Your list.</p>
      </footer>
    </div>
  );
}

export default App;