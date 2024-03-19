import { from } from "linq-to-typescript";

export class FormulaEditorResultModel {
    public wrongResultsArray: any[] = [];
    public wrongResults: Set<any> = new Set();
    public rightResult: any;

}
