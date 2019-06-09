import React from "react";
import firebase from "./firebase";
import CommentBox from "./components/CommentBox";
import "./App.css";

/*
 * Ideally, we would create a page component and have the
 * page handle all the API stuff rather than doing it in App.js,
 * but this is fine for a demo.
 */
class App extends React.Component {
  commentsRef = firebase.firestore().collection("comments");
  fbUnsubscribe = null;

  state = {
    comments: null,
    error: null
  };

  componentWillMount() {
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
    const { comments } = this.state;
    return (
      <div className="siteContainer">
        <h1>Comment Box Demo</h1>
        {
          <CommentBox
            addComment={this.addComment}
            deleteComment={this.deleteComment}
            comments={comments}
          />
        }
      </div>
    );
  }
}

export default App;
