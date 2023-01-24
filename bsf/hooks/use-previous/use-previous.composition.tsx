import React from "react";
import { usePrevious } from "./use-previous";
import { useState } from "react";

export const BasicusePrevious = () => {
  const [date, setDate] = useState<string | undefined>();
  const [prevDate, setPrevDate] = useState<string | undefined>();

  usePrevious(
    ([prevDate, setPrevDate]) => {
      console.log("init", prevDate, date);
      if (typeof setPrevDate === "function") {
        setPrevDate(prevDate as any);
      }
    },
    [date, setPrevDate]
  );

  return (
    <>
      <button onClick={() => setDate(new Date().toJSON())}>
        Generate date
      </button>
      <p>prev: {prevDate || "undefined"}</p>
      <p>title: {date || "undefined"}</p>
    </>
  );
};
