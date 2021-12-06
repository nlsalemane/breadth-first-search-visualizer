import { createContext, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export const NodeContext = createContext();

export function NodeProvider (props) {
    // let columns = parseInt(window.innerWidth/32.5);
    // let rows = parseInt(window.innerHeight/37);
    let columns = parseInt(window.innerWidth/35);
    let rows = parseInt(window.innerHeight/39);
    let initialState = [];
    let nodes = [];

    const getNeighbours = (node) => {
        let top = node.y - 1 >= 0 ? Nodes[node.y - 1][node.x] : null;
        let bottom = node.y + 1 < rows ? Nodes[node.y + 1][node.x] : null;
        let right = node.x + 1 < columns ? Nodes[node.y][node.x + 1] : null;
        let left = node.x - 1 >= 0 ? Nodes[node.y][node.x - 1] : null;
        let bomakhelwane = [top, right, bottom, left];
        const neighbours = [];

        let index = 0;
        for ( let i = 0; i < 4; i++ ) {
            if (bomakhelwane[i] !== null && !bomakhelwane[i].isWall) {
                neighbours[index] = bomakhelwane[i];
                index++;
            }
        }
        return neighbours
    }

    for ( let i = 0; i < rows; i++ ) {
        let rowNodes = [];
        for ( let j = 0; j < columns; j++ ) {
            
            rowNodes.push (
                {
                    x: j,
                    y: i,
                    isStartNode: false,
                    isTarget: false,
                    isVisited: false,
                    onShortestPath: false,
                    isWall: false,
                    isWeight: false,
                    isAnimated: true,
                    id: uuidv4(),
                }
            )
        }
        initialState.push(rowNodes);
    }

    nodes = initialState;

    const [ nodeType, setNodeType ] = useState("");
    const [ Nodes, setNodes ] = useState(nodes);
    const [ targetFound, setTargetFound ] = useState(false);

    const [ mapNodes, setMapNodes] = useState({
        startNode: null,
        targetNode: null
    });

    /* ACTIONS */

    const resetNodes = () => {
        setNodes(initialState);
        setTargetFound(false);
    }

    const updateNode = (currentNode, propName, newPropValue) => {
        setNodes(
            Nodes.map( (row) => {
                return row.map( node => {
                    if ( currentNode.id === node.id ) {
                        node = {...node, [propName]: newPropValue};
                        currentNode = node;
                    }
                    return node;
                });
            })
        );
    }

    const addNode = (event) => {
        setNodes(Nodes.map( row => {
            const row_nodes = row.map( node => {
                if ( nodeType === "" ) {
                    return node;
                }
                else if ( nodeType === "Start" ) {
                    if ( node.id === event.target.id ){
                        node = { ...node, isStartNode: true };
                        setMapNodes({...mapNodes, startNode: node});
                        return node;
                    }
                    else{
                        return { ...node, isStartNode: false };
                    }
                }
                else if ( nodeType === "Target" ) {
                    if ( node.id === event.target.id ){
                        node = { ...node, isTarget: true };
                        setMapNodes({...mapNodes, targetNode: node});
                        return node;
                    }
                    else{
                        return { ...node, isTarget: false };
                    }
                }
                else if ( nodeType === "Wall" ) {
                    if ( node.id === event.target.id ){
                        return { ...node, isWall: true };
                    }
                    else {
                        return node;
                    }
                }
                else if ( nodeType === "Weight" ) {
                    if ( node.id === event.target.id ){
                        return { ...node, isWeight: true };
                    }
                    else{
                        return { ...node, isWeight: false };
                    }
                }
            });
            return row_nodes;
        })
        )
    }

    return(
        <NodeContext.Provider value={{Nodes, setNodes, resetNodes, updateNode, addNode, nodeType, setNodeType, mapNodes, getNeighbours, targetFound, setTargetFound}} >
            {props.children}
        </NodeContext.Provider>
    );
}