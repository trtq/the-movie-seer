import { DIFFICULTY_NAME } from "@/utils/difficulties/types";

export type TSCORES = {
  [difficulty in DIFFICULTY_NAME]: number;
};
