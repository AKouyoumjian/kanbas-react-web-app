import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
function TodoList() {
  
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}/>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            deleteTodo={deleteTodo}
            setTodo={setTodo} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;