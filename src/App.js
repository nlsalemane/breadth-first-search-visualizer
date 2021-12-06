import "./Styles/App.css";

import { NodeProvider } from "./hooks/NodeContext";

import Nav from "./Components/Nav";
import NodeGrid from "./Components/NodeGrid";

function App() {
  return (
    <div className="App">
    <NodeProvider>
      <Nav />
      <NodeGrid />
    </NodeProvider>
    </div>
  );
}

export default App;
