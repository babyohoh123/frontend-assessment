import React from 'react'

const Box = (props) => {

  const {box, draggable, onDragStart, onDragOver, onDrop} = props;

  return (
      <div
        className="box"
        style={{ backgroundColor: box.color }}
        draggable={ draggable }
        onDragStart={onDragStart({ id: box.id })}
        onDragOver={onDragOver({ id: box.id })}
        onDrop={onDrop({ id: box.id })}
      ></div>
  );

}

export default Box;
