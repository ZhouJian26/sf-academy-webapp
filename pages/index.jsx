import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TransactionsView from "../components/transactionsView";
import PortfoliosView from "../components/portfoliosView";
import Dashboard from "../components/layout/Dashboard";

import Head from "next/head";

export default function Home() {
  const [virtualPortfoliosList, setVirtualPortfoliosList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);

  const updatePortfolioList = () => {
    console.log("Fetching virtual portfolio list");
    fetch("/v1/user/listVirtualPortfolios", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((portfolios) => {
        const { listVirtualPortfolio, status } = portfolios;
        if (status != 200) return;
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
    console.log(startDate);
    const queryParams = Object.keys(params)
      .filter((key) => params[key] != undefined)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    fetch("/v1/user/listTransactions?" + queryParams, {
      method: "GET",
      params: { srcCurrency: srcCurrency, destCurrency: destCurrency },
    })
      .then((res) => res.json())
      .then((data) => {
        let { transactions, status } = data;
        if (status != 200) return;
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
  const setFilter = ({ startDate, endDate, srcCurrency, destCurrency }) => {
    updateTransactionList(
      srcCurrency,
      destCurrency,
      startDate != undefined
        ? new Date(startDate).toISOString().slice(0, 19).replace("T", " ")
        : undefined,
      endDate != undefined
        ? new Date(endDate).toISOString().slice(0, 19).replace("T", " ")
        : undefined
    );
  };

  return (
    <Dashboard>
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
          setFilterFunction={setFilter}
        ></TransactionsView>
      </Container>
    </Dashboard>
  );
}
