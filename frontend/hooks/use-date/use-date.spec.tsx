import {
  act,
  renderHook,
} from "@jamalsoueidan/bit-dev.testing-library.react-hooks";
import { useDate } from "./use-date";

it("should increment counter", () => {
  const { result } = renderHook(() => useDate());
  act(() => {
    result.current.toUtc(new Date());
  });
});
