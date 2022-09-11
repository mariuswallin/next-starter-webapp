import { ChallengeMap, Operation } from "../types";

const letters = "abcdqwerty";

export const operatorMap: Record<Operation[1], Operation[0]> = {
  multiply: "*",
  subtract: "-",
  add: "+",
  divide: "/",
};

const operationHandler = ([first, second]: number[]): Record<
  Operation[0],
  number
> => ({
  "*": first * second,
  "-": first - second,
  "+": first + second,
  "/": first / second,
});

function random({ lowNumber = 1, highNumber = 10 }) {
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

type CreateChallengeOpts = {
  count: number;
  operation: Operation[1];
  baseValue?: number;
  lowNumber?: number;
  highNumber?: number;
};

export function createChallenges(options: CreateChallengeOpts): ChallengeMap {
  const values = new Map();
  for (let i = 0; i < options.count; i++) {
    const randomValues = {
      lowNumber: options.lowNumber,
      highNumber: options.highNumber,
    };
    const first = options.baseValue || random(randomValues);
    const second = random(randomValues);
    const numbers = [first, second].sort((a, b) => b - a);
    const operator = operatorMap[options.operation];
    const result = operationHandler(numbers)[operator];
    values.set(generateRandomId(), {
      numbers,
      result: result,
      operator,
      label: `${numbers[0]}${operator}${numbers[1]}`,
    });
  }
  return values;
}
