import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useCallback, useState } from "react";

const ItemTypes = {
    TEXT: "text",
    BOX: "box",
};

const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { id, left, top },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top]
    );
    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
        b;
    }
    return (
        <div
            className="box"
            ref={drag}
            style={{ ...style, left, top }}
            data-testid="box"
        >
            {children}
        </div>
    );
};

const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 20, left: 80, title: "Drag me around" },
        b: { top: 180, left: 20, title: "Drag me too" },
    });
    const moveBox = useCallback(
        (id, left, top) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                })
            );
        },
        [boxes, setBoxes]
    );
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                moveBox(item.id, left, top);
                return undefined;
            },
        }),
        [moveBox]
    );
    return (
        <div ref={drop} style={styles}>
            {Object.keys(boxes).map((key) => {
                const { left, top, title } = boxes[key];
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={hideSourceOnDrag}
                    >
                        {title}
                    </Box>
                );
            })}
        </div>
    );
};
