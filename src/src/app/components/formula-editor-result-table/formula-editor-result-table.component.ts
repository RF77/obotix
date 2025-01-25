import { Component, input } from '@angular/core';
import { FormulaEditorRowResult } from '../formula-editor/models/FormulaEditorRowResult';
import { FormulaEditorResultModel } from '../formula-editor/models/FormulaEditorResultModel';
import { ResultStatus } from './ResultStatus';
import { SaveToStorage } from '../formula-editor/SaveToStorage';

import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { Button, ButtonDirective } from 'primeng/button';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-formula-editor-result-table',
  templateUrl: './formula-editor-result-table.component.html',
  styleUrl: './formula-editor-result-table.component.sass',
  imports: [TableModule, PrimeTemplate, Button, ClipboardModule, ButtonDirective]
})
export class FormulaEditorResultTableComponent {

  public readonly model = input<FormulaEditorRowResult[] | undefined>([]);
  public readonly resultModel = input<FormulaEditorResultModel>(new FormulaEditorResultModel());
  public readonly full = input(false);
  public readonly saveToStorageInstance = input<SaveToStorage>(this);

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
    const resultModel = this.resultModel();
    if (resultModel && resultModel.wrongResults.has(row.result)) {
      return ResultStatus.Wrong;
    }
    if (resultModel && resultModel.rightResult == row.result) {
      return ResultStatus.Right;
    }

    return ResultStatus.Unknown;
  }

  setRowResult(row: FormulaEditorRowResult, isRight: boolean) {
    const resultModel = this.resultModel();
    if (resultModel) {
      if (isRight) {
        resultModel.rightResult = row.result;
        resultModel.wrongResults.delete(row.result);
        console.warn("setRowResult() row set to right");
      } else {
        if (resultModel.rightResult == row.result) {
          resultModel.rightResult = undefined;
        }
        resultModel.wrongResults.add(row.result);
        console.warn("setRowResult() row set to false");
      }
      this.saveToStorage();
    } else {
      console.warn("setRowResult() this.resultModel not set");
    }
  }

  saveToStorage() {
    const saveToStorageInstance = this.saveToStorageInstance();
    if (saveToStorageInstance) {
      saveToStorageInstance.saveToStorage();
    }
  }
}

