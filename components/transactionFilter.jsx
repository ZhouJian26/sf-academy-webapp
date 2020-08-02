import { Container, Button } from "react-bootstrap";
const TransactionFilter = ({ riser }) => {
  return (
    <Container>
      <h1>Transactions</h1>
      <Button
        onClick={(e) => {
          riser(e);
        }}
      ></Button>
    </Container>
  );
};
export default TransactionFilter;
