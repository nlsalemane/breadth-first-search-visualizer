import { useContext } from 'react';
import { motion } from 'framer-motion';

import { NodeContext } from "../hooks/NodeContext";

import Node from "./Node";
import { v4 as uuidv4 } from "uuid";

function NodeGrid() {

    const {Nodes} = useContext(NodeContext);

    const gridVariant = {
        hidden: { opacity: 0.95 },
        visible: {
            opacity: 1,
            transition: {
                type: "spring",
                mass: 90,
                delayChildren: 0,
                staggerChildren: 10,
            }
        }
    }
    
    return(
        <div
            className="grid-layout"
        >
        {
            Nodes.map( rowNodes =>
                <motion.ul key={uuidv4()}
                    variants={gridVariant}
                    initial="hidden"
                    animate="visible"
                >
                {
                    rowNodes.map( node => 
                        (
                            <motion.li 
                                key={node.id} 
                                // variants={gridVariant}
                                // initial="hidden"
                                // animate="visible"
                            >
                                <Node 
                                    x={node.x}
                                    y={node.y}
                                    isStartNode= {node.isStartNode}
                                    isTarget= {node.isTarget}
                                    isVisited= {node.isVisited}
                                    onShortestPath= {node.onShortestPath}
                                    isWall= {node.isWall}
                                    isWeight= {node.isWeight}
                                    isAnimated= {node.isAnimated}
                                    id= {node.id}
                                />
                            </motion.li> 
                        )
                    )
                }
                </motion.ul>
            )
        }
        </div>
    );
}

export default NodeGrid;