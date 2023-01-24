import { useEffect, useRef, useState } from "react";

export interface usePreviousOptions {
  initial?: boolean;
}
// https://stackoverflow.com/a/72876811
export const usePrevious = <T extends any[]>(
  callback: (prev: T) => void,
  deps: T,
  options: usePreviousOptions = { initial: false }
): void => {
  const callbackRef = useRef<null | ((prev: T) => void)>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const depsRef = useRef<T>(deps);

  const [initial, setInitial] = useState(options.initial);

  useEffect(() => {
    if (initial && callbackRef.current !== null) {
      console.log(depsRef?.current);
      callbackRef.current(depsRef?.current);
    }

    depsRef.current = deps;
    setInitial(true);
  }, deps);
};

export default usePrevious;
