import React from "react";
import Comment from "./Comment";
import "./index.css";

class CommentBox extends React.Component {
  state = {
    name: "",
    email: "",
    comment: ""
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addComment = e => {
    e.preventDefault();
    const { name, email, comment } = this.state;

    if (name && email && comment) {
      this.props.addComment(name, email, comment);
      this.setState({
        name: "",
        email: "",
        comment: ""
      });
    }
  };

  render() {
    const { comments, deleteComment } = this.props;
    return (
      <div>
        <form className="formContainer" onSubmit={this.addComment}>
          <div className="nameAndEmailContainer">
            <input
              className="nameInput"
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.updateInput}
            />
            <input
              className="emailInput"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateInput}
            />
          </div>
          <div className="commentContainer">
            <textarea
              className="commentInput"
              name="comment"
              placeholder="Your comment"
              value={this.state.comment}
              onChange={this.updateInput}
            />
          </div>
          <button type="submit">Add Comment!</button>
        </form>
        <hr />
        <ul>
          {comments &&
            comments.map(comment => (
              <li key={comment.id}>
                <Comment
                  deleteComment={() => deleteComment(comment.id)}
                  name={comment.name}
                  email={comment.email}
                  text={comment.comment}
                  timestamp={
                    comment.timestamp
                      ? comment.timestamp.toDate().toString()
                      : "..."
                  }
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
export default CommentBox;
