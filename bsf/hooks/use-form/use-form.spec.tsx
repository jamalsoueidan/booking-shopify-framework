import React from "react";
import { act } from "@testing-library/react";
import { renderHook } from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { useForm } from "./use-form";
import { useField } from "@shopify/react-form";
import { SaveBarProvider } from "@jamalsoueidan/bsf.providers.save-bar";

it("should increment counter", () => {
  const wrapper = () => <SaveBarProvider>test</SaveBarProvider>;

  const { result } = renderHook(
    () =>
      useForm({
        fields: {
          fullname: useField({
            value: "",
            validates: [],
          }),
        },
      }),
    { wrapper }
  );

  act(() => {
    //console.log(result.current);
  });
  //expect(result.current.count).toBe(1)
});
