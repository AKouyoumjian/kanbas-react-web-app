import React from "react";
import HelloReducer from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodosReducer from "../../todo/todosReducer";

const ReduxExamples = () => {
  return (
    <div>
      <h2>Redux Examples</h2>

     

      
      <AddRedux />
      <hr />
      <CounterRedux />
      <hr />
      <HelloReducer />
      <hr />
    </div>
  );
};

export default ReduxExamples;
