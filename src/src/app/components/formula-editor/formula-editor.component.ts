import { Component, OnInit } from '@angular/core';
import { FormulaEditorRowModel } from './models/FormulaEditorRowModel';
import { FormulaEditorModel } from './models/FormulaEditorModel';
import { CalculateResultService } from './services/calculate-result.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { SaveToStorage } from './SaveToStorage';
import { GcService } from '../../services/gc.service';

@Component({
  selector: 'app-formula-editor',
  templateUrl: './formula-editor.component.html',
  styleUrl: './formula-editor.component.sass'
})
export class FormulaEditorComponent implements OnInit, SaveToStorage {


  configKey = "assistantix_config";
  model: FormulaEditorModel = new FormulaEditorModel();

  gcTitle = '';
  error: string | undefined | null;

  menuItems: MenuItem[] | undefined;

  public allResultTypes = [ResultType.Normal, ResultType.OneRow];

  editorOptions = {
    theme: 'vs-light',
    renderLineHighlight: "none",
    language: 'javascript',
    lineDecorationsWidth: 0,
    overviewRulerBorder: 0,
    tabCompletion: "on",
    minimap: { enabled: false },
    wordWrap: "on",
    lineNumbers: "off",
    scrollbar: {
      horizontal: "hidden",
      vertical: "hidden",
    },
    fixedOverflowWidgets: true
  };

  constructor(private calculateResultService: CalculateResultService, private activatedRoute: ActivatedRoute, private router: Router, private gcService: GcService) {

  }

  getRowHeight(row: FormulaEditorRowModel) {
    return '30px';
    // if (!row.content) {
    //   return '20px';
    // }
    // return `${row.content.split("\r\n").length * 20}px`;
  }

  ngOnInit(): void {
    this.gcTitle = this.activatedRoute.snapshot.params['gcTitle'];
    this.loadFromStorage();
    this.initMenu();
  }

  initMenu() {
    this.menuItems = [
      {
        label: 'Daten',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Laden',
            icon: PrimeIcons.CLOUD_DOWNLOAD,
            command: () => this.loadFromStorage()
          },
          {
            label: 'Sichern',
            icon: PrimeIcons.CLOUD_UPLOAD,
            command: () => this.saveToStorage()
          }
        ]
      },
      {
        label: 'Berechnen',
        icon: PrimeIcons.CALCULATOR,
        command: () => this.calculateResult()
      },
      {
        label: 'Neue Reihe',
        icon: PrimeIcons.PLUS_CIRCLE,
        command: () => this.addRow()
      },
      {
        label: 'Neuer GC',
        icon: PrimeIcons.FILE,
        command: () => this.createNewGC()
      }
    ];
  }

  createNewRowFromEditor(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.addRow();
    }
  }

  createNewGC(): void {
    this.router.navigate(['solver']);
  }

  loadFromStorage() {
    const config = localStorage.getItem(`${this.configKey}.${this.gcTitle}`);
    if (config) {
      this.model = JSON.parse(config);
      this.model.result.wrongResults = new Set(this.model.result.wrongResultsArray);
    }
  }

  saveToStorage() {
    this.model.result.wrongResultsArray = Array.from(this.model.result.wrongResults);
    const config = JSON.stringify(this.model);

    localStorage.setItem(`${this.configKey}.${this.gcTitle}`, config);
  }

  calculateResult() {
    var startTime = performance.now()

    this.error = undefined;

    this.error = this.calculateResultService.calculateResult(this.model);

    var endTime = performance.now()

    this.saveToStorage();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

  }

  getResultFromRow(row: FormulaEditorRowModel, full: boolean) {
    if (!full && this.model.configuration.selectedResultType === ResultType.OneRow) {
      return [row.result?.at(0)].filter(i => i != null);
    }
    if (row.unique) {
      return this.gcService.distinctBy(row.result, "result");
    } else {
      return row.result;
    }
  }

  isLastRow(row: FormulaEditorRowModel) {
    return this.model.configuration.rows.indexOf(row) == this.model.configuration.rows.length - 1;
  }

  addRow() {
    const lastVarName = this.model.configuration.rows.length > 0 ? this.model.configuration.rows[this.model.configuration.rows.length - 1].name : undefined;
    const nextVarName = lastVarName && lastVarName.length == 1 ? String.fromCharCode(lastVarName.charCodeAt(0) + 1) : "";
    const newRow = new FormulaEditorRowModel();
    newRow.name = nextVarName;
    this.model.configuration.rows.push(newRow);
    this.saveToStorage();

  }

  deleteRow(row: FormulaEditorRowModel) {
    this.model.configuration.rows = this.model.configuration.rows.filter(i => i != row);
    this.calculateResult();
  }
}

export enum ResultType {
  Normal = "Normal",
  OneRow = "OneRow",
}


