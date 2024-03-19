import { Injectable } from '@angular/core';
import { FormulaEditorModel } from '../models/FormulaEditorModel';
import FormulaEditorVarValue from '../models/FormulaEditorVarValue';
import { FormulaEditorRowResult } from '../models/FormulaEditorRowResult';
import { FormulaEditorRowModel } from '../models/FormulaEditorRowModel';
import _ from "lodash";
import { GcService } from '../../../services/gc.service';
import { CalcContent } from './CalcContent';
import { Coordinate } from '../../../extensions/Coord';
import { GcCoordinate } from '../../../converter/GcCoordinate';

String.prototype.bww = function () { return GcService.instance.bww(this.valueOf()); };
String.prototype.bwwZtoA = function () { return GcService.instance.bwwZtoA(this.valueOf()); };
String.prototype.sum = function () { return GcService.instance.sum(this.valueOf()); };
String.prototype.iqs = function () { return GcService.instance.iqs(this.valueOf()); };
String.prototype.qs = function () { return GcService.instance.qs(this.valueOf()); };
String.prototype.parseCoordinate = function () { return GcService.instance.parseCoordinate(this.valueOf()); };
String.prototype.convertBase = function (from, to) { return GcService.instance.convertBase(this, from, to); };
String.prototype.convertBinToDec = function () { return GcService.instance.convertBase(this, 2, 10); };
String.prototype.convertHexToDec = function () { return GcService.instance.convertBase(this, 16, 10); };
String.prototype.pad = function (size: number) { return GcService.instance.pad(this.valueOf(), size); };
String.prototype.replaceVars = function () { return GcService.instance.replaceVars(this.valueOf()); };
String.prototype.replaceBrackets = function () { return GcService.instance.replaceBrackets(this.valueOf()); };
String.prototype.when = function (b) { return GcService.instance.when(this.valueOf(), b); };
String.prototype.peile = function (distance: number, azimuth: number) { return GcService.instance.peile(this.valueOf(), distance, azimuth); };
String.prototype.peile2 = function (distance: number, azimuth: number) { return GcService.instance.peile2(this.valueOf(), distance, azimuth); };
String.prototype.peileRückwärts = function (distance: number, initialAzimuth: number) { return GcService.instance.peileRückwärts(this.valueOf(), distance, initialAzimuth); };

Array.prototype.bww = function () { return this.map(i => i.bww()); };
Array.prototype.bwwZtoA = function () { return this.map(i => i.bwwZtoA()); };
Array.prototype.iqs = function () { return this.map(i => i.iqs()); };
Array.prototype.qs = function () { return this.map(i => i.qs()); };
Array.prototype.pad = function () { return this.map(i => i.pad()); };
Array.prototype.sum = function () { return GcService.instance.sum(this); };
Array.prototype.parseCoordinates = function () { return this.map(i => i.parseCoordinate(this)); };
Array.prototype.convertBase = function (from, to) { return this.map(i => i.convertBase(this, from, to)); };
Array.prototype.when = function (b) { return GcService.instance.when(this.valueOf(), b); };

Number.prototype.sum = function () { return GcService.instance.sum(this.valueOf()); };
Number.prototype.iqs = function () { return GcService.instance.iqs(this.valueOf()); };
Number.prototype.qs = function () { return GcService.instance.qs(this.valueOf()); };
Number.prototype.convertBase = function (from, to) { return GcService.instance.convertBase(this, from, to); };
Number.prototype.pad = function (size: number) { return GcService.instance.pad(this.valueOf(), size); };
Number.prototype.when = function (b) { return GcService.instance.when(this.valueOf(), b); };
Number.prototype.round = function (decimals) { return GcService.instance.round(this.valueOf(), decimals); };

declare global {
  interface String {
    bww(): number[];
    bwwZtoA(): number[];
    sum(): number;
    iqs(): number;
    qs(): number;
    parseCoordinate(): GcCoordinate;
    convertBase(from: number, to: number): string;
    convertBinToDec(): string;
    convertHexToDec(): string;
    pad(size: Number): string;
    replaceVars(): string;
    replaceBrackets(): string;
    when(value: any, b: (v: any) => Boolean): any[];

    /**
   * Parst den string zu einer Koordinate und macht eine Peilung von einer Koordinate aus mit einer Distanz und dem Azimuth
   * @param distance Distanz in Meter
   * @param azimuth Winkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus
   * @returns Endpunkt als Koordinate
   */
    peile(distance: number, azimuth: number): GcCoordinate;
    /**
    * Mache eine Peilung rückwärts, dass heisst die vorgegebene Kordinate entspricht dem Endpunkt.
    * @param distance Distanz in Meter
    * @param initialAzimuth Anfangswinkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus vom noch unklaren Ursprungspunkt
    * @returns Anfangspunkt als Koordinate
    */
    peileRückwärts(distance: number, initialAzimuth: number): GcCoordinate;
    peile2(distance: number, azimuth: number): GcCoordinate;
  }

  interface Number {
    sum(): number;
    round(decimals: number): number;
    iqs(): number;
    qs(): number;
    pad(size: Number): string;
    convertBase(from: number, to: number): string;
    when(value: any, b: (v: any) => Boolean): any[];
  }

  interface Array<T> {
    bww(): number[];
    bwwZtoA(): number[];
    sum(): number;
    iqs(): number[];
    qs(): number[];
    pad(size: Number): string[];
    parseCoordinates(): GcCoordinate[];
    convertBase(from: number, to: number): string[];
    when(value: any, b: (v: any) => Boolean): any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class CalculateResultService implements CalcContent {

  constructor(private gcService: GcService) {
    this.gcService.calcInterface = this;
  }

  calculateResult(model: FormulaEditorModel): string | null {
    let currentResult: FormulaEditorRowResult[] = [];
    let error: string | null = null;

    model.configuration.rows.forEach(row => {
      try {
        if (error) {
          return;
        }
        row.result = [];
        if (currentResult.length === 0) {
          const result = this.calcContent([], row.content);
          // console.info("Result is ", result);
          this.setRowResult(result, row, [], 0);
        } else {
          currentResult.forEach(res => {
            const result = this.calcContent(res.vars, row.content);
            this.setRowResult(result, row, res.vars, 0);
          });
        }
        currentResult = row.result;
        // console.debug("current result", currentResult);
      } catch (e) {
        let message = 'Unknown Error'
        if (e instanceof Error) message = e.message;
        console.warn(e);
        error = `${row.name} = ${row.content} => ${message}`;
      }
    });
    return error;
  }

  private setRowResult(result: any, row: FormulaEditorRowModel, currentVars: FormulaEditorVarValue[], level: number) {
    if (Array.isArray(result) && level == 0) {
      const newLevel = level + 1;
      (result as any[]).forEach(i => this.setRowResult(i, row, currentVars, newLevel));
    } else {
      const newResult = { result: result, vars: [...currentVars, { name: row.name, value: result } as FormulaEditorVarValue] } as FormulaEditorRowResult
      row.result.push(newResult);
    }
  }

  public calcContent(vars: FormulaEditorVarValue[], content?: string): any {
    const gc = this.gcService;
    gc.vars = vars;
    const allVars = _.mapValues(_.keyBy(vars, 'name'), 'value');
    if (content && content.length > 2 && content[0] == "'" && content[content.length - 1] == "'") {
      // replace string e.g. 'N47 15.abc E8 10.def'
      content = content.replaceAll("'", "");
      return gc.replaceVars(content);
    }
    const evalContent = `${this.getEvalVars(vars)}
      
       ${content ?? "undefined"}`;
    try {
      return eval(evalContent);
    } catch (e) {
      console.warn(`eval of "${evalContent}"`, vars, e);
      throw e;
    }
  }

  private getEvalVars(vars: FormulaEditorVarValue[]) {
    return vars.map(i => `var ${i.name}=allVars['${i.name}'];
    `).join("");
  }

}
