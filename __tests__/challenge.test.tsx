import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Challenge from "../components/Challenge";

describe("Challenge - Component Test", () => {
  it("should have basic setup", async () => {
    const handleAnswer = vi.fn();
    render(
      <Challenge
        id="1"
        label="label"
        handleAddAnswer={handleAnswer}
        answer="5"
      />
    );
    const input = await screen.findByLabelText("label");
    expect(input).toBeInTheDocument();
  });
  it("should trigger callback typing in input", async () => {
    const handleAnswer = vi.fn();
    render(
      <Challenge
        id="1"
        label="label"
        handleAddAnswer={handleAnswer}
        answer="5"
      />
    );
    const input = await screen.findByLabelText("label");
    await user.type(input, "21");
    expect(handleAnswer).toHaveBeenCalledTimes(2);
  });
  it("should hide svg until answer is validated", () => {
    const handleAnswer = vi.fn();
    render(
      <Challenge
        id="1"
        label="label"
        handleAddAnswer={handleAnswer}
        answer="5"
      />
    );
    const svg = screen.queryByTestId("isCorrect");
    expect(svg).not.toBeInTheDocument();
  });
  it("should show svg when answer is validated", async () => {
    const handleAnswer = vi.fn();
    render(
      <Challenge
        id="1"
        label="label"
        handleAddAnswer={handleAnswer}
        answer="5"
        isCorrect={true}
      />
    );
    const svg = await screen.findByTestId("isCorrect");
    expect(svg).toBeInTheDocument();
  });
});
