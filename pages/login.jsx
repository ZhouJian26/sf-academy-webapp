import Link from "next/link";
import Layout from "../components/layout/layout";
import Router from "next/router";
import Head from "next/head";
import { Container, Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const refs = [useRef(null), useRef(null), useRef(null)];
  const singupClick = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    fetch("http://" + process.env.api + "/v1/user/login", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status == 200) return Router.push("/");
    });
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
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
          <Button ref={refs[2]} variant="primary" onClick={singupClick}>
            Login
          </Button>
          <p className="py-3 text-center m-0">or</p>
          <Link href="/signup">
            <Button variant="link" className="p-0">
              Sign Up
            </Button>
          </Link>
        </Form>
      </Container>
    </Layout>
  );
}
