import { FormulaEditorModel } from '../models/FormulaEditorModel';
import { FormulaEditorRowResult } from '../models/FormulaEditorRowResult';
import { FormulaEditorRowModel } from '../models/FormulaEditorRowModel';
import { CalcContent } from './CalcContent';
import "./ExtensionMethods";
export declare class CalculateResultService implements CalcContent {
    private gcService;
    constructor();
    calculateResult(model: FormulaEditorModel): string | null;
    beispiel(model: FormulaEditorModel): FormulaEditorRowResult[];
    getEvalText(model: FormulaEditorModel): string;
    getTextForLastVal(val: FormulaEditorRowModel): string;
    getTextForVal(val: FormulaEditorRowModel): string;
    private getEvalVars;
}
//# sourceMappingURL=calculate-result.service.d.ts.map