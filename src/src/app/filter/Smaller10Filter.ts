import { IFilter } from "./IFilter";


export class Smaller10Filter implements IFilter {
    name: string = "<10";
    tooltip: string = "Wert kleiner 10";
    filter(source: any): boolean {
        return source < 10;
    }
}
