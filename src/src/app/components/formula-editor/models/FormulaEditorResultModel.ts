import { FormulaEditorRowResult } from "./FormulaEditorRowResult";

export class FormulaEditorResultModel {
  public wrongResultsArray: any[] = [];
  public wrongResults: Set<any> = new Set();
  public rightResult: any;
  result: FormulaEditorRowResult[] = []
}
