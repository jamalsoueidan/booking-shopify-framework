import { renderHook } from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { act } from "@testing-library/react-hooks";
import { usePosition } from "./use-position";

it("should return translation for position", () => {
  const { result } = renderHook(() => usePosition());

  act(() => {
    console.log("act", result.current);
  });
});
