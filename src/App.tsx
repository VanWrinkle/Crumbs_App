import './App.css';
import './SocialMediaPost.ts'
import { SocialMediaPost, SocialMediaPostV1, SocialMediaPostDispatch } from "./SocialMediaPost";
import React, {SyntheticEvent, useState} from "react";


function App() {
  let staticPost = new SocialMediaPostV1("Guest", "Hey there! This is a social media post!");
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([staticPost])

  return (
      <>
        <SocialMediaPostNew socialPosts={socialPosts} setSocialPosts={setSocialPosts} />
        <SocialMediaPostsDisplayAllBrief posts={socialPosts} />
      </>
  );
}

function SocialMediaPostsDisplayAllBrief({posts}: {posts: SocialMediaPost[]}) {
    const results = posts.map((post) =>
       <SocialMediaPostDisplayBrief post={post} />
    );
    return (
        <div>{results}</div>
    );
}

function SocialMediaPostDisplayBrief({post}: {post: SocialMediaPost}) {
  return (
      <p>{post.userId}: {post.content}</p>
  );
}

function SocialMediaPostNew(props: {socialPosts: SocialMediaPost[], setSocialPosts: SocialMediaPostDispatch}) {
  const [userInput, setUserInput] = useState("");
  function onClick(e: SyntheticEvent) {
      e.preventDefault();
      let post = new SocialMediaPostV1("Guest", userInput);
      setUserInput("");
      alert("new object created (not stored):\n\n" + JSON.stringify(post, null, 2));
      props.setSocialPosts([post, ...props.socialPosts]);
  }

  return (
    <form onSubmit={onClick}>
      <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button type="submit">Post new crumb</button>
    </form>
  );
}


export default App;
