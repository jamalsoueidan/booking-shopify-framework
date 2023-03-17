import {
  act,
  renderHook,
} from "@jamalsoueidan/bit-dev.testing-library.react-hooks";
import { SettingsProvider } from "@jamalsoueidan/frontend.providers.settings";
import { useDate } from "../use-date";

describe("test toUTC use-date", () => {
  it("should be able to convert time to another timezone", () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: SettingsProvider,
    });
    act(() => {
      const { toUtc, formatInTimezone } = result.current;
      const localtime = new Date("2023-03-17T06:00:00.000Z");
      const local = toUtc(localtime, "Europe/Istanbul"); // convert to JSON
      expect(local.toJSON()).toBe("2023-03-17T03:00:00.000Z");
      expect(formatInTimezone(local, "pppPPP", "Europe/Istanbul")).toBe(
        "06:00:00 GMT+017. marts 2023",
      );
    });
    expect(1).toBe(1);
  });
});
