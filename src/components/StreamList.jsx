import StreamItem from "./StreamItem";

function StreamList({
  streamList,
  removeFromList,
  toggleComplete,
  updateTitle,
}) {
  const watchedCount = streamList.filter((item) => item.completed).length;
  const remainingCount = streamList.length - watchedCount;

  return (
    <section className="list-section">
      <div className="list-heading">
        <div>
          <p className="eyebrow">MY COLLECTION</p>
          <h3>My StreamList</h3>
        </div>

        <div className="list-stats">
          <div className="movie-count">
            {streamList.length} {streamList.length === 1 ? "title" : "titles"}
          </div>

          <div className="watched-count">
            {watchedCount} watched
          </div>

          <div className="remaining-count">
            {remainingCount} remaining
          </div>
        </div>
      </div>

      <div className="stream-grid">
        {streamList.map((item) => (
          <StreamItem
            key={item.id}
            item={item}
            removeFromList={removeFromList}
            toggleComplete={toggleComplete}
            updateTitle={updateTitle}
          />
        ))}
      </div>

      {streamList.length === 0 && (
        <div className="empty-list">
          <span className="material-icons">movie</span>
          <h3>Your StreamList is empty.</h3>
          <p>Add a movie or TV show above to get started.</p>
        </div>
      )}
    </section>
  );
}

export default StreamList;