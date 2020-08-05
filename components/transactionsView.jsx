import { Container, Card, CardDeck } from "react-bootstrap";
import TransactionFilter from "./transactionFilter";
const TransactionsView = ({ transactionsList, setFilterFunction }) => {
  return (
    <Container>
      <h1>Transactions</h1>
      <TransactionFilter
        setFilterFunction={setFilterFunction}
      ></TransactionFilter>
      {transactionsList.length == 0 ? <p>No transactions.</p> : ""}
      <CardDeck className="justify-content-around">
        {transactionsList.map((transaction, index) => (
          <Card
            className="text-center my-3 flex-grow-0"
            style={{ minWidth: "12rem" }}
            key={`transaction-${index}-${transaction.date}`}
          >
            <Card.Header>{`${transaction.srcCurrency} => ${transaction.destCurrency}`}</Card.Header>
            <Card.Body>
              <Card.Text>Amount: {transaction.amount}</Card.Text>{" "}
              <Card.Text>Rate: {transaction.rate}</Card.Text>
              <Card.Text>
                Total: {(transaction.amount * transaction.rate).toFixed(2)}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {new Date(transaction.date).toLocaleString()}
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
};
export default TransactionsView;
