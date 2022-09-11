export type Multiply = ["*", "multiply"];
export type Add = ["+", "add"];
export type Divide = ["/", "divide"];
export type Subtract = ["-", "subtract"];

export type Operation = Multiply | Add | Divide | Subtract;

// const x: Divide = ["+", "divide"];

export type ChallengeLabel = `${number}${Operation[0]}${number}`;

export type Challenge = {
  numbers: [number, number];
  result: number;
  operator: Operation[0];
  label: ChallengeLabel;
};

export type ChallengeMap = Map<string, Challenge>;

export type CreateChallengeOpts = {
  count: number;
  operation: Operation[1];
  baseValue?: number;
};
