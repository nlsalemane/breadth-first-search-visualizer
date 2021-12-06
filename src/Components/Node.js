import { memo, useContext, useState } from "react";
import { motion } from "framer-motion";

import { NodeContext } from "../hooks/NodeContext";
import useKeyPress from "../hooks/useKeyPress";

import { ReactComponent as StartNode } from "../Assets/Icons/Start.svg";
import { ReactComponent as TargetNode } from "../Assets/Icons/Target.svg";
import { ReactComponent as Wall } from "../Assets/Icons/Wall.svg";


const Node = memo( ({ x, y, isStartNode, isTarget, isVisited, onShortestPath, isWall, isWeight, isAnimated, id }) => {

    const {addNode, setNodeType, nodeType} = useContext(NodeContext);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const mouseDownHandler = (event) => { 
        addNode(event);
        setMouseIsPressed(true);
    }

    const drawWallsHandler = (event) => {
        if ( event.ctrlKey ) {
            setNodeType("Wall");
            if ( nodeType === "Wall") {
                addNode(event); 
            }
        }
    }

    const visitedCellVariant = {
        hidden: {
          opacity: 0,
          scale: 0,
          color: "#23272d",
          borderRadius: 100,
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: [0, 0.5, 1.2, 1],
            borderRadius: [75,50,0,0],
            background: [
              "rgba(0, 217, 159, 0.75)",
              "rgba(30, 104, 217, 0.75)",
              "rgba(0, 217, 159, 0.75)",
              "rgba(105, 90, 205, 0.925)"
            ],
            transition: {
              type: "spring",
              mass: 1,
              damping: 5,
              duration: 0.6,
            //   repeat: Infinity
            //   duration: 1,
              // delayChildren: 0.5,
              // staggerChildren: 1
            }
        }
      }
    
    return( 
        isVisited || !isAnimated ? 
        
        <motion.div 
            className={ !isAnimated ? "grid animate" : onShortestPath ? "grid onPath" : isVisited === true ? "grid visited" : "grid" }
            key={id}
            onMouseUp={ () => setMouseIsPressed(false) }
            onMouseOver = { (event) => drawWallsHandler(event) }
            onMouseDown={ (event) => mouseDownHandler(event) }
            id={id}
            variants={visitedCellVariant}
            initial="hidden"
            animate={ isVisited || !isAnimated ? "visible" : "hidden" }
        >
        {
            isStartNode ? <StartNode className="start-icon" />
            :
            isTarget ? <TargetNode className="target-icon" /> 
            : 
            isWall ? <Wall className="wall-icon" />
            :
            null
        }
        </motion.div>
        
        : 
                
        <div 
            className={ !isAnimated ? "grid animate" : onShortestPath ? "grid onPath" : isVisited === true ? "grid visited" : "grid" }
            key={id}
            onMouseUp={ () => setMouseIsPressed(false) }
            onMouseOver = { (event) => drawWallsHandler(event) }
            onMouseDown={ (event) => mouseDownHandler(event) }
            id={id}
            // variants={visitedCellVariant}
            // initial="hidden"
            // animate={ isVisited ? "visible" : "hidden" }
        >
        {
            isStartNode ? <StartNode className="start-icon" />
            :
            isTarget ? <TargetNode className="target-icon" /> 
            : 
            isWall ? <Wall className="wall-icon" />
            :
            null
        }
        </div>
    );
});


export default Node;