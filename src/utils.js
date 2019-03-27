import { DAYTOSECONDS } from "./const";

export const calculatePercentage = flyingTime =>
  (flyingTime * 100) / DAYTOSECONDS;
