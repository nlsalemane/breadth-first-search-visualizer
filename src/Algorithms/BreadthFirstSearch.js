
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

/*
Function to reconstruct the shortest path
@param pathHistory - 
...
*/
function reconstructPath(pathHisory, startNode, prevNode) {
    let path = [];
    
    if (prevNode.id === startNode.id) {
        return startNode;
    }

    for (const [ key, value ] of Object.entries(pathHisory)) {
        if ( value[1] === null ) {
            continue;
        }
        else if ( value[0].id === prevNode.id ) {
            path.splice(0, 0, reconstructPath(pathHisory, startNode, value[1]), value[0]);
        }
    }
    return path.flat();
}


const BreadthFirstSearch = async (startNode, targetNode, Nodes, setNodes, getNeighbours, targetFound, setTargetFound) => {

    if ( !startNode || !targetNode ) {
        return
    }

    let visitedNodes = {};
    let queueSet = new Set();
    let queue = [];
    let shortestPath = new Set();

    visitedNodes[(startNode.x + 100*startNode.y)] = [startNode, null, 0];
    queue.push(startNode);
    queueSet.add(startNode);

    let nodes = Nodes;
    let distance = 0;
    while ( queue.length > 0 && !targetFound ) {
        let currentNode = queue.shift();

        if ( currentNode.id === targetNode.id ) {
            setTargetFound(true);
            targetFound = true;
            reconstructPath(visitedNodes, startNode, targetNode).forEach ( cell => shortestPath.add(cell.id));
        }else {
            let closeNodes = getNeighbours(currentNode);
            distance++;
            closeNodes.forEach( (node) => {
                if( !queueSet.has(node) && node.id !== startNode.id ) {
                    queue.push(node);
                    queueSet.add(node);
                }
            }); 
        }

        let nodess;
        if ( !targetFound ) {
            nodess = nodes.map( (row) => {
                return row.map( node => {
                    if ( currentNode.id === node.id ) {
                        node = {...node, isVisited: true, isAnimated: false};
                        currentNode = node;
                    } 
                    else if (!node.isAnimated) {
                        node = {...node, isAnimated: true};
                    }
                    return node;
                });
            });
        } 
        else {
            nodess = nodes.map( (row) => {
                return row.map( node => {
                    if ( shortestPath.has(node.id) ) {
                        node = {...node, isVisited: true, isAnimated: false, onShortestPath: true};
                        currentNode = node;
                    } 
                    else if (!node.isAnimated) {
                        node = {...node, isAnimated: true};
                    }
                    return node;
                });
            });
        }

        nodes = nodess;
        let closeNodes = getNeighbours(currentNode);
        closeNodes.forEach( node => {
            if ( !visitedNodes[node.x+ 100*node.y] && node.id !== startNode.id && currentNode.id !== targetNode.id ) {
                // console.log(node);
                visitedNodes[(node.x + 100*node.y)] = [node, currentNode, distance];
            }
        });
        setNodes(nodess);
        // await timeout(1);
    }
}

export default BreadthFirstSearch;