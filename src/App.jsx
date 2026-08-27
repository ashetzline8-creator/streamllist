import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import StreamList from "./components/StreamList";
import About from "./components/About";

function App() {
  // Stores what the user is currently typing
  const [title, setTitle] = useState("");

  // Stores all movies and shows in the user's StreamList
  const [streamList, setStreamList] = useState([
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
  ]);

  // Adds a new movie or show to the StreamList
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

  // Marks a movie/show as watched or unwatched
  const toggleComplete = (id) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Updates the title when the user edits an item
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

          {/* About Page */}
          <Route path="/about" element={<About />} />
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