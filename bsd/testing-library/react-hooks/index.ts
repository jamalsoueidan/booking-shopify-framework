import jestRender from "./react-hooks";

// re-export everything
export * from "@testing-library/react";

// override render method
export { jestRender as renderHook };
