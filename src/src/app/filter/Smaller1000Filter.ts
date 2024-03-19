import { IFilter } from "./IFilter";


export class Smaller1000Filter implements IFilter {
    name: string = "<1000";
    tooltip: string = "Wert kleiner 1000";
    filter(source: any): boolean {
        return source < 1000;
    }
}
