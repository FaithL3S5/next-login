"use client";

import { useAppSelector, useAppDispatch } from "@/globalredux/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/globalredux/features/counter/counterSlice";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main className="text-red-500 p-10">
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Increment by Amount
      </button>
      <span>{count}</span>
    </main>
  );
}
