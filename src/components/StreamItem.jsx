function StreamItem({ item, removeFromList }) {
  return (
    <article className="stream-card">
      <div className="poster-placeholder">
        <span className="material-icons">play_arrow</span>
      </div>

      <div className="card-info">
        <div>
          <h4>{item.title}</h4>
          <p>{item.type}</p>
        </div>

        <button
          className="delete-button"
          onClick={() => removeFromList(item.id)}
          aria-label={`Remove ${item.title}`}
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
    </article>
  );
}

export default StreamItem;