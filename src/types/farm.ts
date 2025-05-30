import { Harvest } from "./harvest";

export type Farm = {
    id?: number;
    farmName: string;
    city: string;
    state: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    harvests: Harvest[];
};