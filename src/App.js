import React from "react";
import firebase from "./firebase";
import CommentBox from "./components/CommentBox";

/*
 * Ideally, we would create a page component and have the
 * page handle all the API stuff rather than doing it in App.js,
 * but this is fine for a demo.
 */
class App extends React.Component {
  db = firebase.firestore();
  fbUnsubscribe = null;

  state = {
    comments: "",
    error: null
  };

  componentWillMount() {
    this.fbUnsubscribe = this.db
      .collection("comments")
      .orderBy("date_created", "asc")
      .onSnapshot({
        next: snapshot => {
          const commentDataWithId = snapshot.docs.map(doc =>
            Object.assign({}, doc.data(), { id: doc.id })
          );
          const sortedCommentDataWithId = commentDataWithId;
          console.log(snapshot.docs[0]);
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
  
  addComment = (name, email, comment) => {
    this.db
      .collection("comments")
      .add({
        name,
        email,
        comment,
        date_created: new Date()
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    return (
      <div>
        <CommentBox
          addComment={this.addComment}
          comments={this.state.comments}
        />
      </div>
    );
  }
}

export default App;
