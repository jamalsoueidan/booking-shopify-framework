import * as _ from "@testing-library/dom";

// instead of using "@testing-library/react-hooks" use "@testing-library/react"
// https://stackoverflow.com/questions/74318005/reactdom-render-is-no-longer-supported-in-react-18
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

// re-export everything
export * from "@testing-library/react";
