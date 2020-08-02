import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TransactionsView from "../components/transactionsView";
import PortfoliosView from "../components/portfoliosView";
import Layout from "../components/layout/layout";

import Head from "next/head";
export default function Home() {
  const [virtualPortfoliosList, setVirtualPortfoliosList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);
  const [transactionFilter, setTransactionFilter] = useState({});

  const updatePortfolioList = () => {
    console.log("Fetching virtual portfolio list");
    fetch("http://" + process.env.api + "/v1/user/listVirtualPortfolios", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((portfolios) => {
        console.log("Virtual portfolio fetched");
        console.log(portfolios);
        const { listVirtualPortfolio } = portfolios;
        setVirtualPortfoliosList(listVirtualPortfolio);
      });
  };
  const updateTransactionList = (
    srcCurrency,
    destCurrency,
    startDate,
    endDate
  ) => {
    console.log("Fetching transaction list");
    const params = {
      srcCurrency: srcCurrency,
      destCurrency: destCurrency,
      startDate: startDate,
      endDate: endDate,
    };
    const queryParams = Object.keys(params)
      .filter((key) => params[key] != undefined)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    fetch(
      "http://" + process.env.api + "/v1/user/listTransactions?" + queryParams,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
        params: { srcCurrency: srcCurrency, destCurrency: destCurrency },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Transactions fetched");
        console.log(data);
        let { transactions } = data;
        transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactionsList(transactions);
      });
  };

  useEffect(() => {
    updatePortfolioList();
    updateTransactionList();
  }, []);

  const testFunc = (e) => {
    console.log("triggerd");
    console.log(e);
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Container
        style={{
          minHeight: "85vh",
          paddingBottom: "10%",
        }}
      >
        <PortfoliosView portfoliosList={virtualPortfoliosList}></PortfoliosView>
        <TransactionsView
          transactionsList={transactionsList}
        ></TransactionsView>
      </Container>
    </Layout>
  );
}
