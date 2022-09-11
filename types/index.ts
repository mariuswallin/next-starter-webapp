export type Multiply = ["*", "multiply"];
export type Add = ["+", "add"];
export type Divide = ["/", "divide"];
export type Subtract = ["-", "subtract"];

export type Operation = Multiply | Add | Divide | Subtract;

export type Challenge = {
  numbers: [number, number];
  result: number;
  operator: Operation[0];
  label: `${number}${Operation[0]}${number}`;
};

export type ChallengeMap = Map<string, Challenge>;
