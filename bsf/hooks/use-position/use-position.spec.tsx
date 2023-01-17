import { renderHook } from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { act } from "@testing-library/react-hooks";
import { usePosition } from "./use-position";
import { Application } from "@jamalsoueidan/bsd.preview.application";

it("should return translation for position", () => {
  const { result } = renderHook(() => usePosition(), { wrapper: Application });

  act(() => {
    console.log("act", result.current);
  });
});
