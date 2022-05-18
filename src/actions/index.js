import { SWAP_BOX } from './types';

export const swapBoxes = (fromBox, toBox) => ({
    type: SWAP_BOX,
    payload: {
        fromBox, toBox
    }
});
