import jestRender from "./react";

// re-export everything
export * from "@testing-library/react";

// override render method
export { jestRender as render };
