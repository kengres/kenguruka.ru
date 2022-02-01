import { getMonthCount } from "./utils"

describe('Utils fx', () => {
  it("get number of months between 2 dates", () => {
     expect(getMonthCount()).toBe(0);
     expect(getMonthCount(new Date())).toBe(0);
     expect(getMonthCount(new Date(), 'aaaaaaaaaa')).toBe(0);
    expect(getMonthCount(new Date(), new Date())).toBe(1);
    expect(getMonthCount(new Date().getTime() - (31 * 24 * 60 * 60000), new Date())).toBe(2);
    expect(getMonthCount(new Date().getTime() - (60 * 24 * 60 * 60000), new Date())).toBe(3);
    expect(getMonthCount("2022-02-01", "2021-11-01")).toBe(4);
    expect(getMonthCount("2021-11-01", "2022-11-01")).toBe(13);
  });
});
