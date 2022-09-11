import { describe, expect, it, vi } from "vitest";
import {
  challengeFactory,
  createRandomChallenges,
  operationHandler,
} from "../lib/helpers";

describe("Create challenge", () => {
  describe("Operation handler", () => {
    it("Should handle multiplication", () => {
      const result = operationHandler([1, 2])["*"];
      expect(result).toBe(2);
    });
    it("Should handle addition", () => {
      const result = operationHandler([1, 2])["+"];
      expect(result).toBe(3);
    });
    it("Should handle division", () => {
      const result = operationHandler([2, 2])["/"];
      expect(result).toBe(1);
    });
    it("Should handle subtraction", () => {
      const result = operationHandler([2, 2])["-"];
      expect(result).toBe(0);
    });
  });

  describe("Create challenge map", () => {
    it("should create challenge map", () => {
      const challenges = createRandomChallenges({
        count: 2,
        operation: "multiply",
      });
      expect(challenges.size).toBe(2);
    });
    // Litt for konkret på implementasjon
    it("should have correct keys on challenge map", () => {
      const challenges = createRandomChallenges({
        count: 1,
        operation: "multiply",
      });
      const values = [...challenges.values()];
      const keys = Object.keys(values[0]);
      expect(
        keys.every((key) =>
          ["label", "numbers", "operator", "result"].includes(key)
        )
      ).toBe(true);
    });

    it("should have correct values on challenge maps (mocked)", () => {
      vi.spyOn(global.Math, "random").mockReturnValue(0);

      const challenges = createRandomChallenges({
        count: 1,
        operation: "multiply",
      });

      const values = [...challenges.values()];

      expect(values[0]).toMatchObject({
        label: "1*1",
        numbers: [1, 1],
        operator: "*",
        result: 1,
      });

      vi.clearAllMocks();
    });
  });
  describe("Challenge Factory", () => {
    it("should handle basevalue", () => {
      const challenge = challengeFactory("add", 1, 2, 3);
      expect(challenge).toMatchObject({
        label: "3+2",
        numbers: [3, 2],
        operator: "+",
        result: 5,
      });
    });
    it("should give positive result when subtracting", () => {
      const challenge = challengeFactory("subtract", 1, 2);
      expect(challenge).toMatchObject({
        label: "2-1",
        numbers: [2, 1],
        operator: "-",
        result: 1,
      });
    });
    it("should give positive result when subtracting using basevalue", () => {
      const challenge = challengeFactory("subtract", 1, 2, 3);
      expect(challenge).toMatchObject({
        label: "3-2",
        numbers: [3, 2],
        operator: "-",
        result: 1,
      });
    });
  });
});
