import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const counterState = useSelector((state) => state.counterReducer);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  }

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  }

  return (
    <>
      <p>
        Count: {counterState.value}
      </p>
      <div>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
      </div>
    </>
  );
}
export default Counter;
