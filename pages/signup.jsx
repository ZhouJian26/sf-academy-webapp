import Link from "next/link";
import Layout from "../components/layout/layout";
import Router from "next/router";
import { Container, Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";

import Head from "next/head";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [iban, setIban] = useState("");
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const singupClick = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    fetch("http://" + process.env.api + "/v1/user/signup", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        iban: iban,
        username: username,
      }),
    }).then((response) => {
      if (response.status == 200) return Router.push("/");
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
        <Form className="d-flex flex-column justify-content-center" id="myForm">
          <h1 className="text-center">Sign Up</h1>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={refs[0]}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
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
              value={password}
              onChange={(el) => setPassword(el.target.value)}
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
              value={username}
              onChange={(el) => setUsername(el.target.value)}
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
              value={iban}
              onChange={(el) => setIban(el.target.value)}
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[4].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
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
