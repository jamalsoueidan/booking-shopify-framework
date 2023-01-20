import {
  renderHook,
  act,
} from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { useDate } from "./use-date";

it("should increment counter", () => {
  const { result } = renderHook(() => useDate());
  act(() => {
    result.current.toUtc(new Date());
  });
});
