import { useRef } from "react";
import { useState } from "react";
import Dashboard from "../components/layout/Dashboard";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";

import Head from "next/head";
const currencyAllowed = ["EUR", "USD"];

export default function Buy() {
  const [buyRequest, setBuyRequest] = useState({
    amount: 0,
    srcCurrency: "EUR",
    destCurrency: "EUR",
    isError: false,
    isSuccess: false,
    isPending: false,
  });
  const refs = Array(3)
    .fill()
    .map(() => useRef(null));

  const buy = () => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();

    if (
      !currencyAllowed.includes(buyRequest.srcCurrency) ||
      !currencyAllowed.includes(buyRequest.destCurrency) ||
      buyRequest.isPending
    )
      return;
    setBuyRequest(Object.assign({ ...buyRequest }, { isPending: true }));
    fetch("/v1/user/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(parseFloat(buyRequest.amount).toFixed(2)),
        srcCurrency: buyRequest.srcCurrency,
        destCurrency: buyRequest.destCurrency,
      }),
    }).then((res) =>
      setBuyRequest(
        Object.assign(
          { ...buyRequest },
          {
            isPending: false,
            isSuccess: res.status == 200,
            isError: res.status != 200,
          }
        )
      )
    );
  };
  return (
    <Dashboard>
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
        <Form
          className="d-flex flex-column justify-content-center"
          id="myForm"
          onClick={() =>
            setBuyRequest(
              Object.assign(
                { ...buyRequest },
                { isError: false, isSuccess: false }
              )
            )
          }
        >
          <h1 className="text-center">Buy</h1>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={refs[0]}
              type="number"
              placeholder="Amount"
              min={0.01}
              step={0.01}
              value={buyRequest.amount}
              onChange={(el) => {
                if (isNaN(parseFloat(el.target.value))) return;
                setBuyRequest(
                  Object.assign({ ...buyRequest }, { amount: el.target.value })
                );
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
              onChange={(el) =>
                setBuyRequest(
                  Object.assign(
                    { ...buyRequest },
                    { srcCurrency: el.target.value }
                  )
                )
              }
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
              onChange={(el) =>
                setBuyRequest(
                  Object.assign(
                    { ...buyRequest },
                    { destCurrency: el.target.value }
                  )
                )
              }
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
          {buyRequest.isError ? (
            <Alert variant="danger">Operation failed.</Alert>
          ) : (
            ""
          )}
          {buyRequest.isSuccess ? (
            <Alert variant="success">Operation success.</Alert>
          ) : (
            ""
          )}
          {buyRequest.isPending ? (
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
    </Dashboard>
  );
}
