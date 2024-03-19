import { ResultType } from "../formula-editor.component";
import { FormulaEditorRowModel } from "./FormulaEditorRowModel";


export class FormulaEditorConfigurationModel {
    rows: FormulaEditorRowModel[] = [{ name: "A" } as FormulaEditorRowModel];
    selectedResultType: ResultType = ResultType.Normal;
}
