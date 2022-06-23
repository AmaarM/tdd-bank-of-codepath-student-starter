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

  async function handleOnSubmitNewTransaction() {
    props.setIsCreating(true);

    try{
      const response = await axios.post('http://localhost:3001/bank/transactions',props.newTransactionForm)
      props.setNewTransactionForm(current=>[...current, response.data.transaction])
      }catch(err){
        props.setError(err);
      }


    props.setIsCreating(false);
  }

  return (
    <div className="home">
      <AddTransaction
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
        form={props.newTransactionForm}
        setForm={props.setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
      />
      {props.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity transactions={filteredTransactions} />
      )}
      {props.error ? <h2 className="error">Error...</h2> : ""}
    </div>
  );
}





/* 
  const res = await axios.post("http://localhost:3001/bank/transactions", props.newTransactionForm)
  let prevArr = props.transactions;
  console.log(res);
  props.setTransactions([...prevArr, res.data.transaction]); */




/*   try{
    const response = await axios.post('http://localhost:3001/bank/transactions',{
      transaction:newTransactionForm
    })
    setNewTransactionForm(current=>[...current, response.data.transaction])
    } */


/*     let response;
    const getData = async () => {
      try {
        const res = await axios.post("http://localhost:3001/bank/transactions", props.newTransactionForm)
        if(res){
          let prevArr = props.transactions;
          props.setTransactions([...prevArr, res.data.transaction]);
        }
      } 
      catch (err) {
        props.setError(err);
      }
    }; */