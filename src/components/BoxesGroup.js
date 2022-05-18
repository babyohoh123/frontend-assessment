import React, { useState } from 'react'
import Box from './Box'

const BoxesGroup = (props) => {

    const swapBoxes = (fromBox, toBox) => {
        let boxes = this.state.boxes.slice();
        let fromIndex = -1;
        let toIndex = -1;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].id === fromBox.id) {
                fromIndex = i;
            }
            if (boxes[i].id === toBox.id) {
                toIndex = i;
            }
        }

        if (fromIndex !== -1 && toIndex !== -1) {
            let { fromId, ...fromRest } = boxes[fromIndex];
            let { toId, ...toRest } = boxes[toIndex];
            boxes[fromIndex] = { id: fromBox.id, ...toRest };
            boxes[toIndex] = { id: toBox.id, ...fromRest };

            this.setState({ boxes: boxes });
        }   
    };

    /* The dragstart event is fired when the user starts dragging an element or text selection */
	/* event.target is the source element : that is dragged */
	/* Firefox requires calling dataTransfer.setData for the drag to properly work */
	const handleDragStart = data => event => {
        let fromBox = JSON.stringify({ id: data.id });
        event.dataTransfer.setData("dragContent", fromBox);
    };

    /* The dragover event is fired when an element or text selection is being dragged */
    /* over a valid drop target (every few hundred milliseconds) */
    /* The event is fired on the drop target(s) */
    const handleDragOver = data => event => {
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };

    /* Fired when an element or text selection is dropped on a valid drop target */
	/* The event is fired on the drop target(s) */
	const handleDrop = data => event => {
        event.preventDefault();
  
        let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
        let toBox = { id: data.id };
  
        this.swapBoxes(fromBox, toBox);
        return false;
    };
    
    const makeBoxes = () => {
        return this.state.boxes.map(box => (
          <Box
            box={box}
            key={box.id}
            draggable="true"
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
            />
        ));
    };
  
    return (
        <div className="boxesGroup">{this.makeBoxes()}</div>
    );

}

export default BoxesGroup;
