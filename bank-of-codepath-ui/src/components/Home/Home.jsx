import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import axios from "axios";

export default function Home(props) {
  React.useEffect(() => props.setIsLoading(true), []);

  //Get Transfers Request.
  React.useEffect(() => {
    const getTransfers = async () => {
      try {
        const getData = await axios.get("http://localhost:3001/bank/transfers");
        const data = getData.data;
        if (data) {
          props.setTransfers(data);
        }
      } catch (err) {
        props.setError(err);
      }
    };
    getTransfers();
    props.setIsLoading(false);
  }, []);

  //Get Transactions
  React.useEffect(() => {
    const getTransactions = async () => {
      try {
        const getData = await axios.get(
          "http://localhost:3001/bank/transactions"
        );
        const data = getData.data;
        if (data) {
          props.setTransactions(data.transactions);
        }
      } catch (err) {
        props.setError(err);
      }
    };

    getTransactions();
    props.setIsLoading(false);
  }, []);

  let filteredTransactions = [];
  if (props.filterInputValue) {
    filteredTransactions = props.transactions.filter((e) => {
      return e.description
        .toLowerCase()
        .includes(props.filterInputValue.toLowerCase());
    });
  } else {
    filteredTransactions = props.transactions;
  }

  function handleOnSubmitNewTransaction() {

  }

  if (props.isLoading) {
    return (
      <div className="home">
        <AddTransaction
          isCreating={props.isCreating}
          setIsCreating={props.setIsCreating}
          form={props.newTransactionForm}
          setForm={props.setNewTransactionForm}
          handleOnSubmit={handleOnSubmitNewTransaction}
        />
        <h1>Loading...</h1> 
        {props.error ? <h2 className="error">error</h2> : ""}
      </div>
    );
  } else {
    return (
      <div className="home">
        <AddTransaction
          isCreating={props.isCreating}
          setIsCreating={props.setIsCreating}
          form={props.newTransactionForm}
          setForm={props.setNewTransactionForm}
          handleOnSubmit={handleOnSubmitNewTransaction}
        />
        <BankActivity transactions={filteredTransactions} />
        {props.error ? <h2 className="error">error</h2> : ""}
      </div>
    );
  }
}
