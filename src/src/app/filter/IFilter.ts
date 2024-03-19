export interface IFilter{
    name: string;
    tooltip: string;
    filter(source: any):boolean;
}

