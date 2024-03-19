import { FormulaEditorRowResult } from '../formula-editor/models/FormulaEditorRowResult';
import { FormulaEditorResultModel } from '../formula-editor/models/FormulaEditorResultModel';
import { ResultStatus } from './ResultStatus';
import { SaveToStorage } from '../formula-editor/SaveToStorage';
export declare class FormulaEditorResultTableComponent {
    model: FormulaEditorRowResult[];
    resultModel: FormulaEditorResultModel | undefined;
    full: boolean;
    saveToStorageInstance: SaveToStorage | undefined;
    getResultIcon(row: FormulaEditorRowResult): "pi pi-times red" | "pi pi-check green" | "pi pi-question";
    getResultText(row: FormulaEditorRowResult): "" | "Richtig" | "Falsch";
    getResultStatus(row: FormulaEditorRowResult): ResultStatus;
    setRowResult(row: FormulaEditorRowResult, isRight: boolean): void;
    saveToStorage(): void;
}
//# sourceMappingURL=formula-editor-result-table.component.d.ts.map