/* eslint-disable react/prop-types */
import React from "react";
import { useDrag, useDrop } from "react-dnd";
// import update from "immutability-helper";

const ItemTypes = {
    TEXT: "text",
    BOX: "box",
};
// const handleDrop = (e) => {
//     e.preventDefault();
//     console.log(e);
//     const textItemId = e.dataTransfer.getData("textItemId");
//     console.log(textItemId);
//     const textItem = document.getElementById(textItemId);
//     const imgContainer = imgContainerRef.current;
//     const imgContainerRect = imgContainer.getBoundingClientRect();
//     const textItemRect = textItem.getBoundingClientRect();
//     const x = textItemRect.left - imgContainerRect.left;
//     const y = textItemRect.top - imgContainerRect.top;
//     textItem.style.left = `${x}px`;
//     textItem.style.top = `${y}px`;
// };

const TextItem = ({ text, index, moveText }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.TEXT,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveText(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TEXT,
        item: { type: ItemTypes.TEXT, text, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));
    console.log(drop);
    console.log(ref);
    console.log(drop(ref));
    console.log(index);
    console.log(isDragging);

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="border-2 p-2 mb-1"
            draggable="true"
        >
            {text}
        </div>
    );
};

// return (
//     <div
//         ref={drop}
//         style={{ opacity }}
//         className="border-2 p-2 mb-1"
//         draggable="true"
//     >
//         {text}
//     </div>
// );
// };

export default TextItem;
