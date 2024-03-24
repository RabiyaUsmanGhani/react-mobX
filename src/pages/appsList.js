import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../appStoreContext";
import { ListGroup, Button } from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";

export const AppsList = observer(() => {
  const store = useContext(AppStoreContext);
  const navigate = useNavigate();

  const [items, setItems] = useState(store?.appsList || []);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e, index) => {
    console.log({ e, index });
    e.dataTransfer.setData("index", index.toString());
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    const oldIndex = parseInt(e.dataTransfer.getData("index"));
    const reorderedItems = [...items];
    const [draggedItem] = reorderedItems.splice(oldIndex, 1);
    reorderedItems.splice(newIndex, 0, draggedItem);
    setItems(reorderedItems);
    setIsDragging(false);
  };

  const handleTouchStart = (e, index) => {
    console.log({ e, index });
    setDraggedIndex(index);
  };

  const handleTouchMove = (e) => {
    if (draggedIndex === null) return; // Do nothing if no item is being dragged

    const touchY = e.touches[0].clientY;
    let targetIndex = Math.floor(
      (touchY - e.currentTarget.getBoundingClientRect().top) / 78
    );

    if (targetIndex < 0 || targetIndex >= items.length) return;

    if (targetIndex !== draggedIndex) {
      const reorderedItems = [...items];
      const [draggedItem] = reorderedItems.splice(draggedIndex, 1);
      reorderedItems.splice(targetIndex, 0, draggedItem);
      setItems(reorderedItems);
      setDraggedIndex(targetIndex);
    }
  };

  const handleTouchEnd = () => {
    setDraggedIndex(null);
  };

  useEffect(() => {
    store?.startTimer();

    if (!store?.appsList?.length) {
      store?.createApp({
        id: 1,
        name: "Microsoft: Teams",
      });
      store?.createApp({
        id: 2,
        name: "My App",
      });
    }
    if (store) {
      store.seconds = 60;
    }
    return () => clearInterval(store?.intervalId);
  }, [store]);

  const handleAddApp = () => {
    navigate("/add");
  };
  const remainingPercentage = (store?.seconds / 60) * 100;
  return (
    <div data-testid="apps-list">
      <h3 className="my-5 text-center">Authenticators list</h3>
      <ListGroup as="ul">
        {items?.map((item, index) => {
          return (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
              draggable
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}>
              <div className="ms-2 me-auto">
                <p className="fw-bold mb-0">{item?.name}</p>
                <p className="fw-bold h4">{item?.code}</p>
              </div>
              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={"#004777"}
                size={50}
                strokeWidth={5}
                trailStrokeWidth={5}
                onComplete={() => {
                  return { shouldRepeat: true };
                }}>
                {({ remainingTime }) => {
                  return (
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="small mb-0">
                        {remainingPercentage.toFixed(0)}%
                      </p>
                    </div>
                  );
                }}
              </CountdownCircleTimer>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="d-flex justify-content-center p-3">
        <Button variant="primary" type="button" onClick={handleAddApp}>
          Add
        </Button>
      </div>
    </div>
  );
});
