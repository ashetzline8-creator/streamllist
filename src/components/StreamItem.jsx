import { useState } from "react";

function StreamItem({
  item,
  removeFromList,
  toggleComplete,
  updateTitle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const saveEdit = () => {
    if (editTitle.trim() === "") {
      return;
    }

    updateTitle(item.id, editTitle);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(item.title);
    setIsEditing(false);
  };

  const startEdit = () => {
    setEditTitle(item.title);
    setIsEditing(true);
  };

  return (
    <article
      className={`stream-card ${item.completed ? "completed-card" : ""}`}
    >
      <div className="poster-placeholder">
        <span className="material-icons">
          {item.completed ? "check_circle" : "play_arrow"}
        </span>
      </div>

      <div className="card-info">
        <div className="card-text">
          {isEditing ? (
            <div className="edit-area">
              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveEdit();
                  }

                  if (event.key === "Escape") {
                    cancelEdit();
                  }
                }}
                autoFocus
              />

              <div className="edit-buttons">
                <button
                  className="save-button"
                  onClick={saveEdit}
                  aria-label={`Save changes to ${item.title}`}
                >
                  <span className="material-icons">save</span>
                </button>

                <button
                  className="cancel-button"
                  onClick={cancelEdit}
                  aria-label="Cancel editing"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 className={item.completed ? "completed-title" : ""}>
                {item.title}
              </h4>

              <p>{item.type}</p>

              {item.completed && (
                <span className="watched-label">
                  <span className="material-icons">check</span>
                  Watched
                </span>
              )}
            </>
          )}
        </div>

        {!isEditing && (
          <div className="card-actions">
            <button
              className="edit-button"
              onClick={startEdit}
              aria-label={`Edit ${item.title}`}
              title="Edit title"
            >
              <span className="material-icons">edit</span>
            </button>

            <button
              className="complete-button"
              onClick={() => toggleComplete(item.id)}
              aria-label={
                item.completed
                  ? `Mark ${item.title} as not watched`
                  : `Mark ${item.title} as watched`
              }
              title={item.completed ? "Mark as not watched" : "Mark as watched"}
            >
              <span className="material-icons">
                {item.completed ? "undo" : "check"}
              </span>
            </button>

            <button
              className="delete-button"
              onClick={() => removeFromList(item.id)}
              aria-label={`Remove ${item.title}`}
              title="Delete title"
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default StreamItem;