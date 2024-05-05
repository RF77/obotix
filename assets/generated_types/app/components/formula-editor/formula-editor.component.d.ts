import { OnInit } from '@angular/core';
import { FormulaEditorRowModel } from './models/FormulaEditorRowModel';
import { FormulaEditorModel } from './models/FormulaEditorModel';
import { CalculateResultService } from './services/calculate-result.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SaveToStorage } from './SaveToStorage';
import { GcService } from '../../services/gc.service';
export declare class FormulaEditorComponent implements OnInit, SaveToStorage {
    private calculateResultService;
    private activatedRoute;
    private router;
    private gcService;
    configKey: string;
    model: FormulaEditorModel;
    gcTitle: string;
    error: string | undefined | null;
    menuItems: MenuItem[] | undefined;
    allResultTypes: ResultType[];
    editorOptions: {
        theme: string;
        renderLineHighlight: string;
        language: string;
        lineDecorationsWidth: number;
        overviewRulerBorder: number;
        tabCompletion: string;
        minimap: {
            enabled: boolean;
        };
        wordWrap: string;
        lineNumbers: string;
        scrollbar: {
            horizontal: string;
            vertical: string;
        };
        fixedOverflowWidgets: boolean;
    };
    constructor(calculateResultService: CalculateResultService, activatedRoute: ActivatedRoute, router: Router, gcService: GcService);
    getRowHeight(row: FormulaEditorRowModel): string;
    ngOnInit(): void;
    initMenu(): void;
    createNewRowFromEditor(event: any): void;
    createNewGC(): void;
    loadFromStorage(): void;
    saveToStorage(): void;
    calculateResult(): void;
    getResultFromRow(row: FormulaEditorRowModel, full: boolean): any[];
    isLastRow(row: FormulaEditorRowModel): boolean;
    addRow(): void;
    deleteRow(row: FormulaEditorRowModel): void;
}
export declare enum ResultType {
    Normal = "Normal",
    OneRow = "OneRow"
}
//# sourceMappingURL=formula-editor.component.d.ts.map