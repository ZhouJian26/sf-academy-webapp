import { useEffect, useRef } from "react";
import { useState } from "react";
import Layout from "../components/layout/layout";
import { Container, Form, Button } from "react-bootstrap";

import Head from "next/head";
const currencyAllowed = ["EUR", "USD"];

export default function BankAccount() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const refs = [useRef(null), useRef(null)];

  const transact = (isDeposit) => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    fetch("/v1/user/" + (isDeposit ? "deposit" : "withdraw"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        currency: currency,
      }),
    });
  };
  useEffect(() => {}, []);

  return (
    <Layout>
      <Head>
        <title>Bank Account</title>
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
          <h1 className="text-center">Transfer</h1>
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
          <Form.Group controlId="formCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              ref={refs[1]}
              onChange={(el) => setCurrency(el.target.value)}
              onKeyPress={(event) =>
                event.key == "Enter" ? refs[0].current.focus() : ""
              }
              required
              as="select"
            >
              {currencyAllowed.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              transact(true);
            }}
          >
            Deposit
          </Button>
          <br></br>
          <Button
            variant="primary"
            onClick={() => {
              transact(false);
            }}
          >
            Withdraw
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
