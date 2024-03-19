import { Component, Input } from '@angular/core';
import { FormulaEditorRowResult } from '../formula-editor/models/FormulaEditorRowResult';
import { FormulaEditorResultModel } from '../formula-editor/models/FormulaEditorResultModel';
import { ResultStatus } from './ResultStatus';
import { from } from 'linq-to-typescript';
import { SaveToStorage } from '../formula-editor/SaveToStorage';

@Component({
  selector: 'app-formula-editor-result-table',
  templateUrl: './formula-editor-result-table.component.html',
  styleUrl: './formula-editor-result-table.component.sass'
})
export class FormulaEditorResultTableComponent {

  @Input() public model: FormulaEditorRowResult[] = [];
  @Input() public resultModel: FormulaEditorResultModel | undefined;
  @Input() public full = false;
  @Input() public saveToStorageInstance: SaveToStorage | undefined;

  getResultIcon(row: FormulaEditorRowResult) {
    switch (this.getResultStatus(row)) {
      case ResultStatus.Wrong:
        return "pi pi-times red";
      case ResultStatus.Right:
        return "pi pi-check green";
      case ResultStatus.Unknown:
        return "pi pi-question";
    }
  }

  getResultText(row: FormulaEditorRowResult) {
    switch (this.getResultStatus(row)) {
      case ResultStatus.Right:
        return "Richtig";
      case ResultStatus.Wrong:
        return "Falsch";
      case ResultStatus.Unknown:
        return "";
    }
  }

  getResultStatus(row: FormulaEditorRowResult) {
    if (this.resultModel && this.resultModel.wrongResults.has(row.result)) {
      return ResultStatus.Wrong;
    }
    if (this.resultModel && this.resultModel.rightResult == row.result) {
      return ResultStatus.Right;
    }

    return ResultStatus.Unknown;
  }

  setRowResult(row: FormulaEditorRowResult, isRight: boolean) {
    if (this.resultModel) {
      if (isRight) {
        this.resultModel.rightResult = row.result;
        this.resultModel.wrongResults.delete(row.result);
        console.warn("setRowResult() row set to right");
      } else {
        if (this.resultModel.rightResult == row.result) {
          this.resultModel.rightResult = undefined;
        }
        this.resultModel.wrongResults.add(row.result);
        console.warn("setRowResult() row set to false");
      }
      this.saveToStorage();
    } else {
      console.warn("setRowResult() this.resultModel not set");
    }
  }

  saveToStorage() {
    if (this.saveToStorageInstance) {
      this.saveToStorageInstance.saveToStorage();
    }
  }
}

