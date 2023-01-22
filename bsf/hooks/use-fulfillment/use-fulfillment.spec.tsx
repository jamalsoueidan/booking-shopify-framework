import { renderHook, act } from "@jamalsoueidan/bsd.testing-library.react";
import { useFulfillment } from "./use-fulfillment";

it("should increment counter", () => {
  const { result } = renderHook(() => useFulfillment());
});
