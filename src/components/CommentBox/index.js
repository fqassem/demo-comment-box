import React from "react";
import Comment from "./Comment";
import LoadingIndicator from "../LoadingIndicator";
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

  formatDate = timestamp => {
    return timestamp.toDate().toLocaleDateString("en-EN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  renderComments = () => {
    const { comments, deleteComment } = this.props;
    if (comments.length === 0) {
      return <div className="noComments">Be the first to comment!</div>;
    } else {
      return comments.map(comment => (
        <ul className="commentsList">
          <li key={comment.id}>
            <Comment
              deleteComment={() => deleteComment(comment.id)}
              name={comment.name}
              email={comment.email}
              text={comment.comment}
              timestamp={
                comment.timestamp ? this.formatDate(comment.timestamp) : "..."
              }
            />
          </li>
        </ul>
      ));
    }
  };

  render() {
    return (
      <div>
        <form className="formContainer" onSubmit={this.addComment}>
          <div className="nameContainer">
            <label forName="name">Name:</label>
            <input
              className="nameInput"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.updateInput}
            />
          </div>
          <div className="emailContainer">
            <label forName="email">Email:</label>
            <input
              className="emailInput"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.updateInput}
            />
          </div>
          <div className="userCommentContainer">
            <label forName="comment">Comment:</label>
            <textarea
              className="commentInput"
              name="comment"
              value={this.state.comment}
              onChange={this.updateInput}
            />
          </div>
          <button type="submit" className="submitComment">Add Comment!</button>
        </form>
        <hr />
        {this.props.comments ? this.renderComments() : <LoadingIndicator />}
      </div>
    );
  }
}
export default CommentBox;
