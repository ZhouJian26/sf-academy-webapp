import Link from "next/link";
import Layout from "../components/layout/layout";
import Router from "next/router";
import Head from "next/head";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const refs = Array(3)
    .fill()
    .map(() => useRef(null));

  const singupClick = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    fetch("/v1/user/login", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }).then((response) => {
      response.status == 200 ? Router.push("/") : setIsError(true);
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
        <Form
          className="d-flex flex-column justify-content-center"
          id="myForm"
          onClick={() => setIsError(false)}
        >
          <h1 className="text-center">Login</h1>
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
              required
            />
          </Form.Group>
          {isError ? (
            <Alert variant="danger">Incorrect credentials.</Alert>
          ) : (
            ""
          )}
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
