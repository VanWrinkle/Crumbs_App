import './App.css';
import './SocialMediaPost.ts'
import { SocialMediaPost, SocialMediaPostV1, SocialMediaPostDispatch } from "./SocialMediaPost";
import React, {SyntheticEvent, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Container, Form, Image, Row, Button} from "react-bootstrap";

function App() {
  let staticPost = new SocialMediaPostV1("Guest", "Hey there! This is a social media post!");
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([staticPost])

  return (
      <body>

     <Container className="main-content">
      <Row>
          <SocialMediaTopPanel socialPosts={socialPosts} setSocialPosts={setSocialPosts} />
      </Row>
      <Row>
          <SocialMediaPostsDisplayAllBrief posts={socialPosts} />
      </Row>
     </Container>
      </body>
  );
}

function SocialMediaTopPanel(props: {socialPosts: SocialMediaPost[], setSocialPosts: SocialMediaPostDispatch}) {
    return (
        <>
            <Col xs={3}>
                <Image src="./logo.png" fluid />
            </Col>
            <Col>
                <SocialMediaPostNew socialPosts={props.socialPosts} setSocialPosts={props.setSocialPosts} />
            </Col>
        </>
    );
}

function SocialMediaPostNew(props: {socialPosts: SocialMediaPost[], setSocialPosts: SocialMediaPostDispatch}) {
  const [userInput, setUserInput] = useState("");
  function onClick(e: SyntheticEvent) {
      e.preventDefault();
      let post = new SocialMediaPostV1("Guest", userInput);
      setUserInput("");
      alert("DEBUG: new object created (not stored):\n\n" + JSON.stringify(post, null, 2));
      props.setSocialPosts([post, ...props.socialPosts]);
  }

  return (
    <Form onSubmit={onClick} className="mb-3">
        <Form.Control
            as="textarea"
            rows={3}
            value={userInput}
            placeholder="Write your crumb..."
            className="mt-2 mb-2 textarea"
            onChange={(e) => setUserInput(e.target.value)}>
        </Form.Control>
        <div className="d-grid">
        <Button
            type="submit"
            variant="primary"
            disabled={userInput.length === 0}>Post Crumb</Button>
        </div>
    </Form>
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
        <Card body className="mt-2 mb-2">{post.userId}: {post.content}</Card>
    );
}

export default App;
