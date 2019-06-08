import React from "react";
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
    // validate input
    this.props.addComment(name, email, comment);
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <form onSubmit={this.addComment}>
          <div>Please enter your current comment here:</div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.updateInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.updateInput}
            />
            <textarea name="comment" onChange={this.updateInput} />
          </div>
          <button type="submit">Add Comment!</button>
        </form>
        <ul>
          {comments &&
            comments.map(comment => (
              <li>
                <span>{comment.id} </span>
                <span>{comment.name}</span>
                <span>{comment.email} </span>
                <span>{comment.comment}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
export default CommentBox;
