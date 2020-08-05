import { useRef } from "react";
import { useState } from "react";
import Dashboard from "../components/layout/Dashboard";
import { Container, Form, Button, Alert } from "react-bootstrap";

import Head from "next/head";
const currencyAllowed = ["EUR", "USD"];

export default function BankAccount() {
  const [transferRequest, setTransferRequest] = useState({
    amount: 0,
    currency: "EUR",
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const refs = Array(2)
    .fill()
    .map(() => useRef(null));

  const transact = (isDeposit) => {
    if (!document.getElementById("myForm").checkValidity())
      return document.getElementById("myForm").reportValidity();
    if (transferRequest.isPending) return;
    setTransferRequest(
      Object.assign({ ...transferRequest }, { isPending: true })
    );
    fetch("/v1/user/" + (isDeposit ? "deposit" : "withdraw"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(parseFloat(transferRequest.amount).toFixed(2)),
        currency: transferRequest.currency,
      }),
    }).then((res) =>
      setTransferRequest(
        Object.assign(
          { ...transferRequest },
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
        <Form
          className="d-flex flex-column justify-content-center"
          id="myForm"
          onClick={() =>
            setTransferRequest(
              Object.assign(
                { ...transferRequest },
                {
                  isSuccess: false,
                  isError: false,
                }
              )
            )
          }
        >
          <h1 className="text-center">Transfer</h1>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={refs[0]}
              type="number"
              placeholder="Amount"
              min={0.01}
              step={0.01}
              value={transferRequest.amount}
              onChange={(el) => {
                if (isNaN(parseFloat(el.target.value))) return;
                setTransferRequest(
                  Object.assign(
                    { ...transferRequest },
                    { amount: el.target.value }
                  )
                );
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
              onChange={(el) =>
                setTransferRequest(
                  Object.assign(
                    { ...transferRequest },
                    { currency: el.target.value }
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
                <option key={e}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {transferRequest.isError ? (
            <Alert variant="danger">Operation failed.</Alert>
          ) : (
            ""
          )}
          {transferRequest.isSuccess ? (
            <Alert variant="success">Operation success.</Alert>
          ) : (
            ""
          )}
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
    </Dashboard>
  );
}
