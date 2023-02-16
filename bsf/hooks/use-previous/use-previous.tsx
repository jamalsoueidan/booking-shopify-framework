import { useEffect, useRef, useState } from "react";

export type UsePreviousOptions = {
  initial?: boolean;
};
// https://stackoverflow.com/a/72876811
export const usePrevious = <T extends unknown[]>(
  callback: (prev: T) => void,
  deps: T,
  options: UsePreviousOptions = { initial: false },
): void => {
  const callbackRef = useRef<null | ((prev: T) => void)>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const depsRef = useRef<T>(deps);

  const [initial, setInitial] = useState(options.initial);

  useEffect(() => {
    if (initial && callbackRef.current !== null) {
      callbackRef.current(depsRef?.current);
    }

    depsRef.current = deps;
    setInitial(true);
  }, [deps, initial]);
};

export default usePrevious;
