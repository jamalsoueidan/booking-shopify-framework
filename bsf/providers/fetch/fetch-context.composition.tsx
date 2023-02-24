import React, { useContext, useEffect, useState } from "react";
import { FetchContext } from "./fetch-context";
import { FetchProvider } from "./fetch-context-provider";
import { useFetch } from "./mock";

export function MockComponent() {
  const fetch = useContext(FetchContext);
  const [response, setResponse] = useState<string>();

  useEffect(() => {
    const getResponse = async () => {
      setResponse(await fetch.get({ url: "a" }));
    };

    getResponse();
  }, [fetch]);

  return <div>this should be {response}</div>;
}

export const BasicThemeUsage = () => {
  const fetch = useFetch();
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <FetchProvider fetch={fetch as any}>
      <MockComponent />
    </FetchProvider>
  );
};
