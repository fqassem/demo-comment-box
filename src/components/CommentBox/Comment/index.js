import React from "react";
import "./index.css";

// Should probably make this a configurable param but it's fine for demo purposes
const REDIRECT_URL = "https://www.alomoves.com/hashtags/";

/*
 * Replace hashTags with links
 * Logic from: https://stackoverflow.com/questions/13655333/how-do-i-use-javascript-to-replace-hash-tags-with-links-from-a-jquery-data-attri
 */
function processHashtags(text) {
  const textWithHashtags = text.replace(
    /#(\S*)/g,
    `<a href="${REDIRECT_URL}$1" target="_blank">#$1</a>`
  );
  return textWithHashtags;
}

const Comment = ({ name, timestamp, email, text, deleteComment, id }) => (
  <div className="commentContainer">
    <div className="commentMain">
      <header className="commentHeader">
        <p>{name}</p>
        <p>{timestamp}</p>
        <p>{email}</p>
      </header>
      <div className="commentContent">
        <span dangerouslySetInnerHTML={{ __html: processHashtags(text) }} />
      </div>
    </div>
    <div className="commentRight">
      <button onClick={() => deleteComment(id)}>Delete Comment</button>
    </div>
  </div>
);

export default Comment;
