import { useContext } from "react";

import { NodeContext } from "../hooks/NodeContext";
import BreadthFirstSearch from "../Algorithms/BreadthFirstSearch";

import { ReactComponent as StartNode } from "../Assets/Icons/Start.svg";
import { ReactComponent as TargetNode } from "../Assets/Icons/Target.svg";
import { ReactComponent as Wall } from "../Assets/Icons/Wall.svg";

function Nav() {
    const {Nodes, setNodes, resetNodes, setNodeType, mapNodes, getNeighbours, targetFound, setTargetFound} = useContext(NodeContext);

    const BFS = () => BreadthFirstSearch(mapNodes.startNode, mapNodes.targetNode, Nodes, setNodes, getNeighbours, targetFound, setTargetFound);


    return(
        <nav>
            <header>
                <h1>salemuonPathfinder</h1>
                <button onClick={ BFS } >
                    <h3>Visualize</h3>
                </button>
            </header>
            <div className="legend" >
                <div onClick = { () => setNodeType("Start") }>
                    <StartNode />
                    <h4>Start Node</h4>
                </div>
                <div onClick = { () => setNodeType("Target") }>
                    <TargetNode />
                    <h4>Target Node</h4>
                </div>
                <div>
                    <Wall
                        onClick = { () => setNodeType("Wall") }
                    />
                    <h4>Barrier</h4>
                </div>
                <div onClick = { resetNodes } >
                    <h4>Clear Board</h4>
                </div>
            </div>
        </nav>
    );
}

export default Nav;