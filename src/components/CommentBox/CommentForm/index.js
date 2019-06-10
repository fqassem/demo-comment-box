import React from "react";
import "./index.css";

const CommentForm = ({ name, email, comment, onSubmit, onUpdate }) => (
  <form className="formContainer" onSubmit={onSubmit}>
    <div className="nameContainer">
      <label forName="name">Name:</label>
      <input
        className="nameInput"
        type="text"
        name="name"
        value={name}
        onChange={onUpdate}
        required
      />
    </div>
    <div className="emailContainer">
      <label forName="email">Email:</label>
      <input
        className="emailInput"
        type="email"
        name="email"
        value={email}
        onChange={onUpdate}
        required
      />
    </div>
    <div className="userCommentContainer">
      <label forName="comment">Comment:</label>
      <textarea
        className="commentInput"
        name="comment"
        value={comment}
        onChange={onUpdate}
        required
      />
    </div>
    <button type="submit" className="submitComment">
      Add Comment!
    </button>
  </form>
);

export default CommentForm;
