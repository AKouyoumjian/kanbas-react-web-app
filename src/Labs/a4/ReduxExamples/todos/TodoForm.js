function TodoForm({ todo, setTodo, addTodo, updateTodo }) {
  return (
    <li className="list-group-item">
      <button onClick={() => addTodo(todo)}> Add </button>
      <button onClick={() => updateTodo(todo)}> Update </button>
      <input value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
    </li>
  );
}
export default TodoForm;
