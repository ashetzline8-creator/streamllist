import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import StreamList from "./components/StreamList";
import About from "./components/About";

function App() {
  const [title, setTitle] = useState("");

  const [streamList, setStreamList] = useState([
    { id: 1, title: "Stranger Things", type: "TV Series" },
    { id: 2, title: "The Batman", type: "Movie" },
    { id: 3, title: "The Last of Us", type: "TV Series" },
  ]);

  const addToList = () => {
    if (title.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title,
      type: "Movie / Show",
    };

    setStreamList([...streamList, newItem]);
    setTitle("");
  };

  const removeFromList = (id) => {
    setStreamList(streamList.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
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
                />
              </>
            }
          />

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