import React from "react";
import { Application } from "@jamalsoueidan/bsd.preview.application";
import { render } from "@testing-library/react";
import * as _ from "@testing-library/dom";
// https://github.com/microsoft/TypeScript/issues/36800

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

export default (ui, options = {}) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};
