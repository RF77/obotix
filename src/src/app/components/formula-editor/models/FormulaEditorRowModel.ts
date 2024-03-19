import { FormulaEditorRowResult } from "./FormulaEditorRowResult";

export class FormulaEditorRowModel {
  name: string | undefined;
  content: string | undefined;
  result: FormulaEditorRowResult[] = [];
  unique = true;
  hasFocus = false;
}


