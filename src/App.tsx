import './App.css';
import './SocialMediaPost.ts'
import { SocialMediaPost, SocialMediaPostV1 } from "./SocialMediaPost";


function App() {
  let staticPost = new SocialMediaPostV1("Guest", "Hey there! This is a social media post!");
  return (
    <SocialMediaPostDisplayBrief post={staticPost} />
  );
}

function SocialMediaPostDisplayBrief({post}: {post: SocialMediaPost}) {
  return (
      <p>{post.userId}: {post.content}</p>
  );
}

export default App;
