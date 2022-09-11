import { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/Title";
import { operatorMap } from "../../lib/helpers";
import { Operation } from "../../types";

export default function ChallengesPage() {
  const router = useRouter();
  const [operation, setOperation] = useState<Operation[1]>("multiply");
  const [count, setCount] = useState(10);
  const navigateToChallenge = () => {
    router.push({
      pathname: "/challenges/[operation]",
      query: { operation, count: count },
    });
  };
  return (
    <>
      <Title title={"Hei. Her kan du prøve deg på noen spennende oppgaver"} />
      <p>Under kan du velge antall oppgaver og regneoperasjon</p>
      <input
        type="number"
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}
      />
      <select
        value={operation}
        onChange={(event) => setOperation(event.target.value as Operation[1])}
      >
        {Object.entries(operatorMap).map(([operation, operator]) => (
          <option key={operation} value={operation}>
            {operator}
          </option>
        ))}
      </select>
      <button type="button" onClick={navigateToChallenge}>
        Gå til oppgave
      </button>
    </>
  );
}
