import ModuleList from "../Modules/ModuleList";
import Status from "./status";

function Home() {
  return (
    <div className="row">
      <div className="col">
        <ModuleList />
      </div>
      <div className="col-3 d-none d-xl-block mx-4">
        <Status />
      </div>
    </div>
  );
}
export default Home;
