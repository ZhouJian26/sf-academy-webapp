import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

const currencyAllowed = ["ALL", "EUR", "USD"];

const TransactionFilter = ({ setFilterFunction }) => {
  const [filter, setFilter] = useState({
    startDate: undefined,
    endDate: undefined,
    srcCurrency: undefined,
    destCurrency: undefined,
  });

  return (
    <Container>
      <Form className="d-flex flex-column justify-content-center" id="myForm">
        <Form.Row className="justify-content-around">
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(el) =>
                setFilter(
                  Object.assign({ ...filter }, { startDate: el.target.value })
                )
              }
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(el) =>
                setFilter(
                  Object.assign({ ...filter }, { endDate: el.target.value })
                )
              }
            />
          </Form.Group>
          <Form.Group controlId="srcCurrency">
            <Form.Label>Source Currency</Form.Label>
            <Form.Control
              as="select"
              onChange={(el) =>
                setFilter(
                  Object.assign(
                    { ...filter },
                    {
                      srcCurrency:
                        el.target.value == "ALL" ? undefined : el.target.value,
                    }
                  )
                )
              }
            >
              {currencyAllowed.map((e) => (
                <option key={`src-${e}`}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="destCurrency">
            <Form.Label>Destination Currency</Form.Label>
            <Form.Control
              as="select"
              onChange={(el) =>
                setFilter(
                  Object.assign(
                    { ...filter },
                    {
                      destCurrency:
                        el.target.value == "ALL" ? undefined : el.target.value,
                    }
                  )
                )
              }
            >
              {currencyAllowed.map((e) => (
                <option key={`dest-${e}`}>{e}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button
          onClick={() => {
            setFilterFunction({ ...filter });
          }}
        >
          Filter
        </Button>
      </Form>
    </Container>
  );
};
export default TransactionFilter;
