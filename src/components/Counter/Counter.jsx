import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button className="border" onClick={() => setCount((prev) => prev + 1)}>
          Increase
        </button>
      </div>
    </>
  );
};

export default Counter;
