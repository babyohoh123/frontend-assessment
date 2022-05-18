import React from "react";
import { connect } from "react-redux";
import { swapBoxes } from '../actions';
import Box from '../components/Box';

function BoxList({ boxes, onSwapBox }) {

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
  
        onSwapBox(fromBox, toBox);
        return false;
    };

    return (
        <div className="boxesGroup">
            {
                boxes.map(box => {
                    return (
                        <Box 
                            box= { box } 
                            key={ box.id } 
                            draggable= "true"
                            onDragStart={ handleDragStart }
                            onDragOver={ handleDragOver }
                            onDrop={ handleDrop } />
                    )
                })
            }
        </div>
    );
}

function mapDispatchToProps (dispatch) {
    return {
        onSwapBox (fromBox, toBox) {
            dispatch(swapBoxes(fromBox, toBox));
        }
    }
}

function mapStateToProps (state) {
    return {
        boxes: state.boxes
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxList);
