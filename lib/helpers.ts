import {
  ChallengeLabel,
  ChallengeMap,
  CreateChallengeOpts,
  Operation,
} from "../types";

const letters = "abcdqwerty";

export const operatorMap: Record<Operation[1], Operation[0]> = {
  multiply: "*",
  subtract: "-",
  add: "+",
  divide: "/",
};

export const operationHandler = ([first, second]: [number, number]): Record<
  Operation[0],
  number
> => ({
  "*": first * second,
  "-": first - second,
  "+": first + second,
  "/": first / second,
});

export function random({ lowNumber = 1, highNumber = 10 }) {
  return Math.floor(Math.random() * (highNumber + 1 - lowNumber) + lowNumber);
}

function generateRandomId() {
  const lettersArray = [...letters];
  return lettersArray
    .map(
      () =>
        `${
          lettersArray[random({ highNumber: lettersArray.length - 1 })]
        }${random({
          highNumber: 9,
        })}`
    )
    .join("");
}

export function challengeFactory(
  operation: Operation[1],
  firstValue: number,
  secondValue: number,
  baseValue?: number
) {
  const [first, second] = [baseValue || firstValue, secondValue].sort(
    (a, b) => b - a
  );

  const operator = operatorMap[operation];
  const label = `${first}${operator}${second}` as ChallengeLabel;
  const result = operationHandler([first, second])[operator];
  return { numbers: [first, second], label, result, operator };
}

export function createRandomChallenges(
  options: CreateChallengeOpts
): ChallengeMap {
  const values = new Map();
  for (let i = 0; i < options.count; i++) {
    const firstValue = random({});
    const secondValue = random({});
    const { numbers, result, operator, label } = challengeFactory(
      options.operation,
      firstValue,
      secondValue,
      options.baseValue
    );

    values.set(generateRandomId(), {
      numbers,
      result,
      operator,
      label,
    });
  }
  return values;
}
