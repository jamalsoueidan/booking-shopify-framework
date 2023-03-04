// instead of using "@testing-library/react-hooks" use "@testing-library/react"
// https://stackoverflow.com/questions/74318005/reactdom-render-is-no-longer-supported-in-react-18
// https://github.com/microsoft/TypeScript/issues/36800

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((query) => ({
      addEventListener: jest.fn(),
      addListener: jest.fn(), // Deprecated
      dispatchEvent: jest.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      removeListener: jest.fn(), // Deprecated
    })),
    writable: true,
  });
});

// re-export everything
export * from "@testing-library/react";
