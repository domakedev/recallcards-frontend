import React, { useEffect, useRef } from "react";

const RenderCounter = () => {
  //useRef render Counter
  const renderCounter = useRef(0);
  useEffect(() => {
    renderCounter.current = renderCounter.current + 1;
  });
  return (
    <p>
      Render Counter: <span>{renderCounter.current}</span>
    </p>
  );
};

export default RenderCounter;
