import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const CommentForm = ({ name, email, comment, onSubmit, onUpdate }) => (
  <form className="formContainer" onSubmit={onSubmit}>
    <div className="nameContainer">
      <label htmlFor="name">Name:</label>
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
      <label htmlFor="email">Email:</label>
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
      <label htmlFor="comment">Comment:</label>
      <textarea
        className="commentInput"
        name="comment"
        value={comment}
        onChange={onUpdate}
        required
      />
    </div>
    <button type="submit" className="submitComment">
      Submit
    </button>
  </form>
);

CommentForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default CommentForm;
