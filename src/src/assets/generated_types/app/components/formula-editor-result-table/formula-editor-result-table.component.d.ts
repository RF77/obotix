import { FormulaEditorRowResult } from '../formula-editor/models/FormulaEditorRowResult';
import { FormulaEditorResultModel } from '../formula-editor/models/FormulaEditorResultModel';
import { ResultStatus } from './ResultStatus';
import { SaveToStorage } from '../formula-editor/SaveToStorage';
export declare class FormulaEditorResultTableComponent {
    readonly model: import("@angular/core").InputSignal<FormulaEditorRowResult[] | undefined>;
    readonly resultModel: import("@angular/core").InputSignal<FormulaEditorResultModel>;
    readonly full: import("@angular/core").InputSignal<boolean>;
    readonly saveToStorageInstance: import("@angular/core").InputSignal<SaveToStorage>;
    getResultIcon(row: FormulaEditorRowResult): "pi pi-times red" | "pi pi-check green" | "pi pi-question";
    getResultText(row: FormulaEditorRowResult): "" | "Richtig" | "Falsch";
    getResultStatus(row: FormulaEditorRowResult): ResultStatus;
    setRowResult(row: FormulaEditorRowResult, isRight: boolean): void;
    saveToStorage(): void;
}
//# sourceMappingURL=formula-editor-result-table.component.d.ts.map