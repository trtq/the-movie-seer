import { DIFFICULTIES } from "./difficulties";
import { DIFFICULTY_NAME } from "./types";

describe("difficulties", () => {
  it("defines difficulties that have all the fields", () => {
    expect(Object.values(DIFFICULTY_NAME).length).toBeGreaterThan(0);
    for (const diff of Object.values(DIFFICULTY_NAME)) {
      expect(DIFFICULTIES[diff].health).toBeGreaterThanOrEqual(1);
      expect(DIFFICULTIES[diff].pages).toBeGreaterThanOrEqual(1);
      expect(DIFFICULTIES[diff].results).toBeGreaterThanOrEqual(1);
      expect(DIFFICULTIES[diff].years).toBeGreaterThanOrEqual(1);
    }
  });
});
