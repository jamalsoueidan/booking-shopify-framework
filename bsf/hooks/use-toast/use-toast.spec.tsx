import React from "react";
import { act } from "@testing-library/react-hooks";
import { renderHook } from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { useToast } from "./use-toast";
import { ToastProvider } from "@jamalsoueidan/bsf.providers.toast";

it("should show toast message", () => {
  const wrapper = () => <ToastProvider>test</ToastProvider>;

  const { result } = renderHook(() => useToast(), {
    wrapper,
  });

  act(() => {
    result.current?.show({ content: "hej med dig" });
  });
});
