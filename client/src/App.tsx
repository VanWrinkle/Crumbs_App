import './App.css';
import './Crumb.ts'
import { Crumb, CrumbV1, SocialMediaPostDispatch } from "./Crumb";
import React, {SyntheticEvent, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Container, Form, Image, Row, Button} from "react-bootstrap";

function App() {
  let staticPost = new CrumbV1("Guest", "Hey there! This is a social media post!");
  const [crumbs, setCrumbs] = useState<Crumb[]>([staticPost])

  return (
      <body>

     <Container className="main-content">
      <Row>
          <SocialMediaTopPanel crumbs={crumbs} setCrumbs={setCrumbs} />
      </Row>
      <Row>
          <SocialMediaPostsDisplayAllBrief crumbs={crumbs} />
      </Row>
     </Container>
      </body>
  );
}

/**
 * main panel which includes logo and message compose component
 * @param props - array of crumbs
 */
function SocialMediaTopPanel(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
    return (
        <>
            <Col xs={3}>
                <Image src="./logo.png" fluid />
            </Col>
            <Col>
                <SocialMediaPostNew crumbs={props.crumbs} setCrumbs={props.setCrumbs} />
            </Col>
        </>
    );
}

/**
 * panel for composing new crumbs
 * @param props - array of crumbs and setter
 */
function SocialMediaPostNew(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
  const [userInput, setUserInput] = useState("");
  function onClick(e: SyntheticEvent) {
      e.preventDefault();
      let post = new CrumbV1("Guest", userInput);
      setUserInput("");
      alert("DEBUG: new object created (not stored):\n\n" + JSON.stringify(post, null, 2));
      props.setCrumbs([post, ...props.crumbs]);
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

/**
 * panel that iterates over crumbs array and includes component for each
 * @param crumb - array of crumbs
 */
function SocialMediaPostsDisplayAllBrief({crumbs}: {crumbs: Crumb[]}) {
    const results = crumbs.map((crumb) =>
        <SocialMediaPostDisplaySingleBrief crumb={crumb} />
    );
    return (
        <div>{results}</div>
    );
}

/**
 * component for a single crumb
 * @param crumb - single crumb
 */
function SocialMediaPostDisplaySingleBrief({crumb}: {crumb: Crumb}) {
    return (
        <Card className="mb-2">
            <Row>
                <Col xs={3}>
                    <Card.Img src="./logo192.png" />
                </Col>
                <Col>
                    <Card.Body className="mt-2 mb-2">
                        <Card.Title>{crumb.userId}:</Card.Title>
                        <Card.Text>{crumb.content}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default App;
