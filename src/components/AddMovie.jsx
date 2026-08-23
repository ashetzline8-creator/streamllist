function AddMovie({ title, setTitle, addToList }) {
  return (
    <section className="hero">
      <p className="eyebrow">YOUR PERSONAL WATCHLIST</p>

      <h2>
        What will you <span>watch next?</span>
      </h2>

      <p className="description">
        Keep track of the movies and shows you want to stream all in one
        convenient location.
      </p>

      <div className="add-form">
        <input
          type="text"
          placeholder="Enter a movie or TV show..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addToList();
            }
          }}
        />

        <button onClick={addToList}>
          <span className="material-icons">add</span>
          Add to List
        </button>
      </div>
    </section>
  );
}

export default AddMovie;