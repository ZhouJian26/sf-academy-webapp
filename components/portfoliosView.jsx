import { Container, Card, CardDeck } from "react-bootstrap";
const PortfoliosView = ({ portfoliosList }) => {
  return (
    <Container>
      <h1>Virtual Portfolio</h1>
      <CardDeck>
        {portfoliosList.map((portfolio, index) => (
          <Card
            style={{ minWidth: "10rem" }}
            key={`portfolio-${index}-${portfolio.date}`}
          >
            <Card.Body>
              <Card.Title>{portfolio.currency}</Card.Title>
              <Card.Text>Balance: {portfolio.balance}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
};
export default PortfoliosView;
