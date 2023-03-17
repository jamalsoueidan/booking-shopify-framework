import {
  act,
  renderHook,
} from "@jamalsoueidan/bit-dev.testing-library.react-hooks";
import {
  SettingsProvider,
  defaultValues,
} from "@jamalsoueidan/frontend.providers.settings";
import { useDate } from "../use-date";

describe("test formatInTimeZone use-date", () => {
  it("should be able to override timezone", () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: SettingsProvider,
    });
    act(() => {
      const { formatInTimezone } = result.current;
      const localtime = new Date("2023-03-25T12:00:00.341Z");
      expect(formatInTimezone(localtime, "pppPPP", "Europe/Copenhagen")).toBe(
        "13:00:00 GMT+025. marts 2023",
      );
      expect(formatInTimezone(localtime, "pppPPP", "Europe/Istanbul")).toBe(
        "15:00:00 GMT+025. marts 2023",
      );
    });
  });

  it("should format date to selected timezone in settingsprovider", () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: SettingsProvider,
    });
    act(() => {
      const { formatInTimezone, timeZone } = result.current;
      const localtime = new Date("2023-03-25T12:00:00.341Z");
      expect(timeZone).toBe(defaultValues.timeZone);
      expect(formatInTimezone(localtime, "pppPPP")).toBe(
        "13:00:00 GMT+025. marts 2023",
      );
    });
  });
});
