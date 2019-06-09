import React from "react";
import CommentForm from "./CommentForm";
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

  renderCommentsList = () => {
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
        <CommentForm
          name={this.state.name}
          email={this.state.email}
          comment={this.state.comment}
          onUpdate={this.updateInput}
          onSubmit={this.addComment}
        />
        <hr />
        {this.props.comments ? this.renderCommentsList() : <LoadingIndicator />}
      </div>
    );
  }
}
export default CommentBox;
