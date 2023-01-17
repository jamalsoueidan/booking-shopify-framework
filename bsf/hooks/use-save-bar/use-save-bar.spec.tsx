import React from "react";
import { renderHook } from "@jamalsoueidan/bsd.testing-library.react-hooks";
import {
  SaveBarContextType,
  SaveBarProvider,
} from "@jamalsoueidan/bsf.providers.save-bar";
import { act } from "@testing-library/react-hooks";
import { UseSaveBarProps, useSaveBar } from "./use-save-bar";

it("should show saveBar", () => {
  const wrapper = () => <SaveBarProvider>test</SaveBarProvider>;

  const { result } = renderHook<UseSaveBarProps, SaveBarContextType>(
    () => useSaveBar({ show: false }),
    { wrapper }
  );

  act(() => {
    console.log("act", result.current);
    result.current?.setForm({ show: false });
  });

  console.log(result.current);
});
