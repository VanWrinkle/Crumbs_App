import './App.css';
import './SocialMediaPost.ts'
import { SocialMediaPost, SocialMediaPostV1 } from "./SocialMediaPost";
import {SyntheticEvent, useState} from "react";


function App() {
  let staticPost = new SocialMediaPostV1("Guest", "Hey there! This is a social media post!");
  return (
      <>
        <SocialMediaPostNew />
        <SocialMediaPostDisplayBrief post={staticPost} />
      </>
  );
}

function SocialMediaPostDisplayBrief({post}: {post: SocialMediaPost}) {
  return (
      <p>{post.userId}: {post.content}</p>
  );
}

function SocialMediaPostNew() {
  const [userInput, setUserInput] = useState("");
  function onClick(e: SyntheticEvent) {
      e.preventDefault();
      let post = new SocialMediaPostV1("Guest", userInput);
      setUserInput("");
      alert("new object created (not stored):\n\n" + JSON.stringify(post, null, 2));
  }

  return (
    <form onSubmit={onClick}>
      <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button type="submit">Post new crumb</button>
    </form>
  );
}


export default App;
