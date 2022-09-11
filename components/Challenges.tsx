import { useMemo } from "react";
import { ChallengeMap } from "../types";
import Challenge from "./Challenge";
import Title from "./Title";

type ChallengesProps = {
  title: string;
  challenges: ChallengeMap;
  answers: Record<
    string,
    { result: number; value: string; isCorrect?: boolean }
  >;
  handleAddAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function Challenges({
  title,
  challenges,
  answers,
  handleAddAnswer,
  handleSubmit,
}: ChallengesProps) {
  return (
    <form className="challenges" onSubmit={handleSubmit}>
      <Title title={title} />
      <ul>
        {[...challenges.entries()].map(([id, challenge]) => (
          <Challenge
            key={id}
            id={id}
            label={challenge.label}
            answer={answers[id]?.value || ""}
            isCorrect={answers[id]?.isCorrect}
            handleAddAnswer={handleAddAnswer}
          />
        ))}
      </ul>
      <button type="submit">Send svar</button>
    </form>
  );
}
