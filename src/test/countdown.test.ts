import { describe, expect, it } from "vitest";
import { getTimeLeft } from "@/lib/countdown";

describe("getTimeLeft", () => {
  it("splits remaining time into days, hours, minutes, seconds", () => {
    const ms = ((2 * 86400) + (3 * 3600) + (4 * 60) + 5) * 1000;
    expect(getTimeLeft(ms, 0)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
  });
  it("stops at zero after the wedding", () => {
    expect(getTimeLeft(0, 5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
