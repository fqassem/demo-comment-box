import React from "react";
import PropTypes from "prop-types";
import "./index.css";

// Should probably make this a configurable param but it's fine for demo purposes
const REDIRECT_URL = "https://www.alomoves.com/hashtags/";

/*
 * Replace hashTags with links
 * Logic from: https://stackoverflow.com/questions/13655333/how-do-i-use-javascript-to-replace-hash-tags-with-links-from-a-jquery-data-attri
 * 
 * I pulled the bits of the regex from multiple sources. It will work for
 * most cases, but only for ASCII characters. We'll need a heavier
 * duty regex for supporting other languages. There is a Unicode standard
 * that defines how a regex should behave, but it seems most companies like
 * Instagram, Twitter, etc use their own interpretation of the standard.
 * 
 * For the sake of simplicity, my regex assumes there's a space in front of 
 * the hashtag character or it's at the beginning of a string. This doesn't meet
 * the Unicode standard but it's fine for a demo. A valid hashtag is upper and lowercase
 * letters
 */
function processHashtags(text) {
  const textWithHashtags = text.replace(
    /(^|\s)#([a-zA-Z\d-]+)/g,
    `$1<a href="${REDIRECT_URL}$2" target="_blank">#$2</a>`
  );
  return textWithHashtags;
}

const Comment = ({ name, timestamp, text, deleteComment, id }) => (
  <div className="commentContainer">
    <div className="commentMain">
      <header className="commentHeader">
        <p>{name}</p>
        <p>{timestamp}</p>
      </header>
      <div className="commentContent">
        <span dangerouslySetInnerHTML={{ __html: processHashtags(text) }} />
      </div>
    </div>
    <div className="commentRight">
      <button onClick={() => deleteComment(id)}>Delete</button>
    </div>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string,
  timestamp: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  deleteComment: PropTypes.func.isRequired
};

export default Comment;
