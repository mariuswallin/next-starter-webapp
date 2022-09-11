import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Challenges from "../../components/Challenges";
import { createRandomChallenges, operatorMap } from "../../lib/helpers";
import { ChallengeMap, Operation } from "../../types";

const getOperation = (query: Record<string, unknown>): Operation[1] | null => {
  if (!("operation" in query)) return null;

  if (query.operation === null || query.operation === undefined) return null;

  const queryAsArray = Array.isArray(query.operation)
    ? query.operation
    : [query.operation];

  const operator = queryAsArray.find((q) =>
    Object.keys(operatorMap).includes(q)
  );

  if (operator) {
    return operator as Operation[1];
  }

  return null;
};

export default function ChallengePage() {
  const router = useRouter();
  const { query } = router;
  const [answers, setAnswers] = useState<
    Record<string, { result: number; value: string; isCorrect?: boolean }>
  >({});
  const [challenges, setChallenges] = useState<ChallengeMap>(new Map());

  const operation = getOperation(query);

  const handleAddAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const id = event.target.id;
      const challenge = challenges.get(id);
      if (challenge) {
        setAnswers((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            result: challenge.result,
            value,
          },
        }));
      }
    },
    [challenges]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedAnswers = [...challenges.entries()].map(
      ([id, challenge]) => {
        if (!answers[id])
          return [
            id,
            { result: challenge.result, value: "", isCorrect: false },
          ];
        return [
          id,
          {
            ...answers[id],
            isCorrect:
              answers[id].value &&
              Number(answers[id].value) === challenge.result
                ? true
                : false,
          },
        ];
      }
    );

    setAnswers(Object.fromEntries(validatedAnswers));
  };

  useEffect(() => {
    if (operation && query.count && Number(query.count)) {
      setChallenges(
        createRandomChallenges({
          count: Number(query.count),
          operation,
        })
      );
    }
  }, [operation, query.count]);

  return (
    <>
      {challenges?.size > 0 ? (
        <Challenges
          title="Bli bedre til å regne. Løs oppgavene under:"
          challenges={challenges}
          answers={answers}
          handleAddAnswer={handleAddAnswer}
          handleSubmit={handleSubmit}
        />
      ) : (
        <p>
          Ugyldig. Bruk {Object.keys(operatorMap).join(", ")} og et gyldig
          antall
        </p>
      )}
    </>
  );
}
