import React from "react";

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
  <div>
    {name}
    {timestamp}
    {email}
    <span dangerouslySetInnerHTML={{ __html: processHashtags(text) }} />
    {id}
    <button onClick={() => deleteComment(id)}>Delete Comment</button>
  </div>
);

export default Comment;
