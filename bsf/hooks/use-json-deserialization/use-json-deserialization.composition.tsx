import React from "react";
import { useJsonDeserialization } from "./use-json-deserialization";

const object = JSON.stringify({
  date: new Date().toJSON(),
});

export const BasicuseJsonDeserialization = () => {
  const data = useJsonDeserialization(JSON.parse(object));

  return (
    <>
      <h1>The current date: {data.date}</h1>
      <div>
        <pre>{object}</pre>
      </div>
    </>
  );
};
