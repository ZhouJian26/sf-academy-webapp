import Head from "next/head";
import { Fragment } from "react";
const Layout = ({ children }) => (
  <Fragment>
    <Head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main>{children}</main>
  </Fragment>
);

export default Layout;
