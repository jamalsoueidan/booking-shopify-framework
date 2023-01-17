import React from "react";
import { Application } from "@jamalsoueidan/bsd.preview.application";
// instead of using "@testing-library/react-hooks" use "@testing-library/react"
// https://stackoverflow.com/questions/74318005/reactdom-render-is-no-longer-supported-in-react-18
import { renderHook } from "@testing-library/react";
// https://github.com/microsoft/TypeScript/issues/36800
import * as _ from "@testing-library/dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const AllTheProviders = ({ children }) => {
  return <Application>{children}</Application>;
};

export default <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options = {}
) => {
  const Component = options["wrapper"] ? options["wrapper"] : () => <></>;

  const wrap = () => {
    return (
      <AllTheProviders>
        <Component />
      </AllTheProviders>
    );
  };

  return renderHook(callback, { ...options, wrapper: wrap });
};
