import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import Router from "next/router";
import { useEffect } from "react";
const Dashboard = ({ children }) => {
  useEffect(() => {
    fetch("/v1/user/ping")
      .then((res) => res.json())
      .then((res) => (res.status == 401 ? Router.push("/login") : ""));
  }, []);
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar bg="light" sticky="top" className="justify-content-center">
        <Nav>
          <Nav.Item className="mx-3">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-3">
            <Link href="/buy">
              <a>Buy</a>
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-3">
            <Link href="/bankAccount">
              <a>Transfer</a>
            </Link>
          </Nav.Item>
        </Nav>
        <Nav.Item className="mx-3">
          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              fetch("/v1/user/logout").then(() => Router.push("/login"))
            }
          >
            Logout
          </Button>
        </Nav.Item>
      </Navbar>
      <main>{children}</main>
      <footer>
        <Container className="text-center">
          <p>@{new Date().getFullYear()} SF Academy Exchange.</p>
        </Container>
      </footer>
    </Fragment>
  );
};

export default Dashboard;
