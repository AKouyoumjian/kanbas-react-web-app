import BooleanVariables from "./BooleanVariables";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import IfElse from "./IfElse"; 
import TernaryOperator from "./TernaryOperator";
import WorkingWithFunctions from "./WorkingWithFunctions";
import WorkingWithArrays from "./WorkingWithArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import JsonStringify from "./JsonStringify";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import TemplateLiterals from "./TemplateLiterals";
import House from "./House";
import Spread from "./Spread";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import Add from "./Add";
import PathParameters from "./PathParameters";

function JavaScript() {
  console.log("Hello World!");
  return (
    <div>
      <h1>JavaScript</h1>
      <Add />
      <FunctionDestructing />
      <Destructing />
      <Spread />
      <House />
      <FilterFunction />
      <FindIndex />
      <FindFunction />
      <JsonStringify />
      <MapFunction />
      <ForLoops />
      <AddingAndRemovingDataToFromArrays />
      <WorkingWithArrays />
      <WorkingWithFunctions />
      <TernaryOperator />
      <IfElse />
      <BooleanVariables />
      <VariableTypes />
      <VariablesAndConstants />
      <TemplateLiterals />
      <ArrayIndexAndLength />
      <br /> <br />
      <br />
      <br />
    </div>
  );
}
export default JavaScript;
