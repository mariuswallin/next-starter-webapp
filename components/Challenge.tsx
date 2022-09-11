import * as React from "react";

type ChallengeProps = {
  id: string;
  label: string;
  handleAddAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  answer: string;
  isCorrect?: boolean;
};

function Challenge({
  id,
  label,
  handleAddAnswer,
  answer,
  isCorrect,
}: ChallengeProps) {
  // TODO: Se rerender issue når "parent" muterer state
  // Håndtere valideringer lokalt
  // Håndtere sjekk kun ved submit
  // Bruke memo

  //console.log(id);
  return (
    <li>
      <label htmlFor={id}>
        <span>{label}</span>
        <input
          id={id}
          type="text"
          onChange={handleAddAnswer}
          value={answer || ""}
        />
        {typeof isCorrect === "boolean" ? (
          <span className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={`${isCorrect ? "green" : "red"}`}
              width="100%"
              height="100%"
              data-testid="isCorrect"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        ) : null}
      </label>
    </li>
  );
}

// Bruker memo for å forhindre rerender (unødvendig, men viser)
// Må da ha useCallback på handleAddAnswer i ChallengesPage
// Dette da denne vil "lage" på nytt hver gang om vi ikke optimaliserer den
// Disse tingene kan føre til mindre ytelse og brukes varsomt
export default React.memo(Challenge);
