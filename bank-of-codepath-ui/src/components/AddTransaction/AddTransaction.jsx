import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction(props) {
  function handleOnFormFieldChange(e) {
    let name = "";
    let category = "";
    let amount = 0;
    if (e.target.name === "name") {
      name = e.target.value;
    }
    if (e.target.name === "category") {
      category = e.target.value;
    }
    if (e.target.name === "amount") {
      amount = e.target.value;
    }

    let newForm = { name: name, category: category, amount: amount };

    console.log(newForm);
    props.setForm(newForm);
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={props.handleOnSubmit}
        form={props.form}
        isCreating={props.isCreating}
      />
    </div>
  );
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            placeholder="name"
            name="name"
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            placeholder="category"
            name="category"
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            placeholder="amount"
            name="amount"
            onChange={props.handleOnFormFieldChange}
          />
        </div>

        <button className="btn add-transaction" type="submit">
          Add
        </button>
      </div>
    </div>
  );
}
