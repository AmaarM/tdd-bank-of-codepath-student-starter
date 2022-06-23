import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction(props) {
  let descrption = "";
  let category = "";
  let amount = 0;

  function handleOnFormFieldChange(e) {
    props.setForm(prevObj => ({...prevObj, [e.target.name] : e.target.value}));
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
            placeholder="description"
            name="description"
            type="text"
            value={props.form ? props.form.description : ""}
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            placeholder="category"
            name="category"
            type="text"
            onChange={props.handleOnFormFieldChange}
            value={props.form ? props.form.category : ""}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            placeholder="amount"
            name="amount"
            type="number"
            onChange={props.handleOnFormFieldChange}
            value={props.form ? props.form.amount : ""}
          />
        </div>

        <button
          className="btn add-transaction"
          type="submit"
          onClick={props.handleOnSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}
