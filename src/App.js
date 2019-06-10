import React from "react";
import Comments from "./containers/Comments";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="siteContainer">
        <h1>Comments Demo</h1>
        <Comments />
      </div>
    );
  }
}

export default App;
