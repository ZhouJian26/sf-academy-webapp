import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
const Layout = ({ children }) => (
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
      <Navbar.Brand>Exchange App</Navbar.Brand>
    </Navbar>
    <main>{children}</main>
    <footer>
      <Container className="text-center">
        <p>@{new Date().getFullYear()} SF Academy Exchange.</p>
      </Container>
    </footer>
  </Fragment>
);

export default Layout;
