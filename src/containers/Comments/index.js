import React from "react";
import CommentBox from "../../components/CommentBox";
import firebase from "../../firebase";

class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      error: null
    };
    this.commentsRef = firebase.firestore().collection("comments");
    this.fbUnsubscribe = null;
  }

  componentDidMount() {
    this.fbUnsubscribe = this.commentsRef
      .orderBy("timestamp", "asc")
      .onSnapshot({
        next: snapshot => {
          const sortedCommentDataWithId = snapshot.docs.map(doc =>
            Object.assign({}, doc.data(), { id: doc.id })
          );
          this.setState({
            comments: sortedCommentDataWithId
          });
        },
        error: error =>
          this.setState({
            error
          })
      });
  }

  componentWillUnmount() {
    this.fbUnsubscribe && this.fbUnsubscribe();
  }

  addComment = async (name, email, comment) => {
    try {
      await this.commentsRef.add({
        name,
        email,
        comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      this.setState({ e });
    }
  };

  deleteComment = async id => {
    try {
      await this.commentsRef.doc(id).delete();
    } catch (e) {
      this.setState({ e });
    }
  };

  render() {
    return (
      <CommentBox
        addComment={this.addComment}
        deleteComment={this.deleteComment}
        comments={this.state.comments}
      />
    );
  }
}

export default CommentsContainer;
