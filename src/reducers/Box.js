import { SWAP_BOX } from '../actions/types';
import { generateColors } from '../utils/helper';

let boxes = [
    // { id: 1, name: "BOX1", color: "red" },
    // { id: 2, name: "BOX2", color: "green" },
    // { id: 3, name: "BOX3", color: "blue" },
    // { id: 4, name: "BOX4", color: "orange" },
    // { id: 5, name: "BOX5", color: "pink" },
    // { id: 6, name: "BOX6", color: "yellow" }
];

generateBoxes(); // initial state boxes

function generateBoxes() {
    let colors = generateColors(8*8);
    boxes = colors.map((color, index) => {
        return {
            id: index,
            name: color,
            color: color
        };
    });
}

function swapBoxes(state, fromBox, toBox) {

    let boxes = state.slice();
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
    }

    return boxes;
}

export default function boxesReducer(state = boxes, action) {
    switch (action.type) {
        case SWAP_BOX:
            return swapBoxes(state, action.payload.fromBox, action.payload.toBox);
        default: 
            return state;
    }
}
