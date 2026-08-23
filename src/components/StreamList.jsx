import StreamItem from "./StreamItem";

function StreamList({ streamList, removeFromList }) {
  return (
    <section className="list-section">
      <div className="list-heading">
        <div>
          <p className="eyebrow">MY COLLECTION</p>
          <h3>My StreamList</h3>
        </div>

        <div className="movie-count">
          {streamList.length} {streamList.length === 1 ? "title" : "titles"}
        </div>
      </div>

      <div className="stream-grid">
        {streamList.map((item) => (
          <StreamItem
            key={item.id}
            item={item}
            removeFromList={removeFromList}
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