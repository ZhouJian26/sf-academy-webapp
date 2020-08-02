import { useEffect, useRef } from "react";
import { useState } from "react";
import Layout from "../components/layout/layout";
import { Container, Form, Button, Spinner } from "react-bootstrap";

import Head from "next/head";
const currencyAllowed = ["EUR", "USD"];

export default function Buy() {
  const [amount, setAmount] = useState(0);
  const [srcCurrency, setSrcCurrency] = useState("EUR");
  const [destCurrency, setDestCurrency] = useState("USD");
  const [buyStatus, setBuyStatus] = useState(false);
  const refs = [useRef(null), useRef(null), useRef(null)];

  const buy = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    if (
      !currencyAllowed.includes(srcCurrency) ||
      !currencyAllowed.includes(destCurrency) ||
      buyStatus
    )
      return;
    setBuyStatus(true);
    fetch("/v1/user/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        srcCurrency: srcCurrency,
        destCurrency: destCurrency,
      }),
    }).then((res) => setBuyStatus(false));
  };
  useEffect(() => {}, []);

  return (
    <Layout>
      <Head>
        <title>Buy</title>
      </Head>
      <Container
        fluid={true}
        className="d-flex justify-content-center pt-3"
        style={{
          minHeight: "85vh",
          paddingBottom: "10%",
        }}
      >
        <Form className="d-flex flex-column justify-content-center" id="myForm">
          <h1 className="text-center">Buy</h1>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={refs[0]}
              type="number"
              placeholder="Amount"
              min={0.01}
              step={0.01}
              value={amount}
              onChange={(el) => {
                if (isNaN(parseFloat(el.target.value))) return;
                setAmount(el.target.value);
              }}
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[1].current.focus() : ""
              }
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group controlId="formStartCurrency">
            <Form.Label>Start Currency</Form.Label>
            <Form.Control
              ref={refs[1]}
              onChange={(el) => setSrcCurrency(el.target.value)}
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[2].current.focus() : ""
              }
              required
              as="select"
            >
              {currencyAllowed.map((e) => (
                <option key={`src-${e}`}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formEndCurrency">
            <Form.Label>End Currency</Form.Label>
            <Form.Control
              ref={refs[2]}
              onChange={(el) => setDestCurrency(el.target.value)}
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[0].current.focus() : ""
              }
              required
              as="select"
            >
              {currencyAllowed.map((e) => (
                <option key={`dest-${e}`}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {buyStatus ? (
            <Button variant="primary">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={buy}>
              Buy
            </Button>
          )}
        </Form>
      </Container>
    </Layout>
  );
}
