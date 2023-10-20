function TodoItem({ todo, deleteTodo, setTodo }) {
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => deleteTodo(todo.id)}> Delete </button>
      <button onClick={() => setTodo(todo)}> Edit </button>
      {todo.title}
    </li>
  );
}
export default TodoItem;
