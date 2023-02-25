import {
  act,
  renderHook,
} from "@jamalsoueidan/bsd.testing-library.react-hooks";
import { useUrl } from "./use-url";

describe("test use-url", () => {
  it("should create url", () => {
    const { result } = renderHook(() => useUrl("a/"));
    let url;
    act(() => {
      url = result.current.createURL({ url: "test" });
    });
    expect(url).toBe("a/test");
  });

  it("should create url with params", () => {
    const { result } = renderHook(() => useUrl("a/"));
    let url;
    act(() => {
      url = result.current.createURL({
        params: { staff: "test" },
        url: "test",
      });
    });
    expect(url).toBe("a/test?staff=test");
  });

  it("should create url with default params and params", () => {
    const { result } = renderHook(() => useUrl("a/", { shop: "test" }));
    let url;
    act(() => {
      url = result.current.createURL({
        params: { staff: "test" },
        url: "test",
      });
    });
    expect(url).toBe("a/test?staff=test&shop=test");
  });
});
