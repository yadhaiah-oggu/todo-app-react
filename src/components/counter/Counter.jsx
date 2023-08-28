import { useState } from "react";
import CounterButton from "./CounterButton";

import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCounterParentFunction(by) {
    setCount(count + by);
  }
  function decrementCounterParentFunction(by) {
    setCount(count - by);
  }
  function resetCounter(by) {
    setCount(0);
  }

  return (
    <>
      <span className="totalCount">{count}</span>
      <CounterButton
        incrementMethod={incrementCounterParentFunction}
        decrementMethod={decrementCounterParentFunction}
      />
      <CounterButton
        by={2}
        incrementMethod={incrementCounterParentFunction}
        decrementMethod={decrementCounterParentFunction}
      />
      <CounterButton
        by={5}
        incrementMethod={incrementCounterParentFunction}
        decrementMethod={decrementCounterParentFunction}
      />

<button
            className="resetButton"
            onClick={resetCounter}
          >
            Reset
          </button>
    </>
  );
}
