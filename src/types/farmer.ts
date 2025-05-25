import { Farm } from "./farm";

export type Farmer = {
  id?: number;
  federalIdentification: string;
  farmerName: number;
  farms?: Farm[];
};