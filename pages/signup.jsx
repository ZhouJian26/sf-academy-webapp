import Link from "next/link";
import Layout from "../components/layout/layout";
import Router from "next/router";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

import Head from "next/head";
export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    iban: "",
  });
  const [isRepeted, setIsRepeted] = useState(false);

  const refs = Array(5)
    .fill()
    .map(() => useRef(null));

  const singupClick = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    fetch("/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        iban: user.iban,
        username: user.username,
      }),
    }).then((response) => {
      response.status == 200 ? Router.push("/") : setIsRepeted(true);
    });
  };

  return (
    <Layout>
      <Head>
        <title>Signup</title>
      </Head>
      <Container
        fluid={true}
        className="d-flex justify-content-center pt-3"
        style={{
          minHeight: "95vh",
          paddingBottom: "10%",
        }}
      >
        <Form
          className="d-flex flex-column justify-content-center"
          id="myForm"
          onClick={() => setIsRepeted(false)}
        >
          <h1 className="text-center">Sign Up</h1>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={refs[0]}
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(el) =>
                setUser(Object.assign({ ...user }, { email: el.target.value }))
              }
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[1].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={refs[1]}
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(el) =>
                setUser(
                  Object.assign({ ...user }, { password: el.target.value })
                )
              }
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[2].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={refs[2]}
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(el) =>
                setUser(
                  Object.assign({ ...user }, { username: el.target.value })
                )
              }
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[3].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group controlId="formIban">
            <Form.Label>Iban</Form.Label>
            <Form.Control
              ref={refs[3]}
              type="text"
              placeholder="Iban"
              value={user.iban}
              onChange={(el) =>
                setUser(Object.assign({ ...user }, { iban: el.target.value }))
              }
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[4].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
          {isRepeted ? <Alert variant="danger">Email not available</Alert> : ""}
          <Button ref={refs[4]} variant="primary" onClick={singupClick}>
            Sign Up
          </Button>
          <p className="py-3 text-center m-0">or</p>
          <Link href="/login">
            <Button variant="link" className="p-0">
              Login
            </Button>
          </Link>
        </Form>
      </Container>
    </Layout>
  );
}
