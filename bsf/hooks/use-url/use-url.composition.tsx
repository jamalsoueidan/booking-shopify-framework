import React from "react";
import { useUrl } from "./use-url";

export const Basic = () => {
  const { createURL } = useUrl("/api/admin");

  return (
    <>
      <h1>
        the current url{" "}
        {createURL({ params: { test: new Date() }, url: "/schedules" })}
      </h1>
    </>
  );
};
