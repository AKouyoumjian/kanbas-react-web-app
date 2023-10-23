import DynamicStyling from "./DynamicStyling";
import JavaScript from "./JavaScript";
import PathParameters from "./PathParameters";
import Classes from "./Classes";
import Styles from "./Styles";
import ConditionalOutput from "./ConditionalOutput";
import TodoItem from "../todo/TodoItem";
import TodoList from "../todo/TodoList";
function Assignment3() {
  return (
    <div>
      <h1>Assignment 3</h1>

      <TodoList />
      <TodoItem
        todo={{
          done: true,
          title: "Make Dinner",
          status: "Done",
        }}
      />
      <TodoItem
        todo={{
          done: true,
          title: "pick up kids",
          status: "In Progress",
        }}
      />

      <ConditionalOutput />
      <Styles />
      <Classes />
      <PathParameters />
      <DynamicStyling />
      <JavaScript />
    </div>
  );
}
export default Assignment3;
