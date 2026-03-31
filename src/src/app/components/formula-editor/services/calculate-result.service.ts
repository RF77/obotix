import { Injectable, inject } from '@angular/core';
import { FormulaEditorModel } from '../models/FormulaEditorModel';
import FormulaEditorVarValue from '../models/FormulaEditorVarValue';
import { FormulaEditorRowResult } from '../models/FormulaEditorRowResult';
import { FormulaEditorRowModel } from '../models/FormulaEditorRowModel';
import _ from "lodash";
import { GcService } from '../../../services/gc.service';
import { CalcContent } from './CalcContent';
import { from } from 'linq-to-typescript';
import "./ExtensionMethods"


const indirectEval = (code: string) => (0, eval)(code);
const placeholder = '__placeholder__';

const evalTest = `(() =>{
    let a_arr = (() => {
      return [1, 3];
    })();
    const is_a_array = Array.isArray(a_arr);
    a_arr = is_a_array ? a_arr : [a_arr];
    a_arr.forEach((a) => {
      vars.set('a', a);
      let b_arr = a + 4;
      const is_b_array = Array.isArray(b_arr);
      b_arr = is_b_array ? b_arr : [b_arr];
      b_arr.forEach((b) => {
        vars.set('b', b);
        let c_arr = [4 - a, 5 + b];
        const is_c_array = Array.isArray(c_arr);
        c_arr = is_c_array ? c_arr : [c_arr];
        c_arr.forEach((c) => {
          vars.set('c', c);
          result.push(new FormulaEditorRowResult(from(vars.keys()).select(i => new FormulaEditorVarValue(i, vars.get(i))).toArray(), c));
        });
      });
    });

    return result;})()`;


@Injectable({
  providedIn: 'root'
})
export class CalculateResultService implements CalcContent {
  private gcService = inject(GcService);


  constructor() {
    // this.gcService.calcInterface = this;
  }

  calculateResult(model: FormulaEditorModel): string | null {
    let error: string | null = null;
    let evalText = "";
    try {
      model.result.result = [];

      const vars = new Map<string, any>();
      const internalResult: FormulaEditorRowResult[] = [];
      const gc = this.gcService;
      gc.vars = vars;
      evalText = this.getEvalText(model)
      model.result.result = eval(evalText);
    } catch (e) {
      let message = 'Unknown Error'
      if (e instanceof Error) message = e.message;
      console.warn(e);
      error = `${evalText} => ${message}`;
    }
    return error;
  }

  beispiel(model: FormulaEditorModel) {

    const result: FormulaEditorRowResult[] = [];
    const vars = new Map<string, any>();

    let a_arr: any = (() => {
      return [1, 3];
    })();
    const is_a_array = Array.isArray(a_arr);
    a_arr = is_a_array ? a_arr : [a_arr];
    a_arr.forEach((a: any) => {
      vars.set('a', a);
      let b_arr: any = a + 4;
      const is_b_array = Array.isArray(b_arr);
      b_arr = is_b_array ? b_arr : [b_arr];
      b_arr.forEach((b: any) => {
        vars.set('b', b);
        let c_arr: any = [4 - a, 5 + b];
        const is_c_array = Array.isArray(c_arr);
        c_arr = is_c_array ? c_arr : [c_arr];
        c_arr.forEach((c: any) => {
          vars.set('c', c);
          result.push(new FormulaEditorRowResult(from(vars.keys()).select(i => new FormulaEditorVarValue(i, vars.get(i))).toArray(), c));
        });
      });
    });

    return result;
  }

  getEvalText(model: FormulaEditorModel) {
    let result = `(() =>{
    ${placeholder}
    return internalResult;})()`;
    model.configuration.rows.filter(i => i.name && i.content).forEach((val, index, arr) => {
      const isLast = index + 1 === arr.length;
      result = result.replace(placeholder, this.getTextForVal(val));
      if (isLast) {
        result = result.replace(placeholder, this.getTextForLastVal(val));
      }
    });
    return result;
  }

  getTextForLastVal(val: FormulaEditorRowModel) {
    return `internalResult.push(new FormulaEditorRowResult(from(vars.keys()).select(i => new FormulaEditorVarValue(i, vars.get(i))).toArray(), vars.get('${val.name}')));`;
  }

  getTextForVal(val: FormulaEditorRowModel) {
    const content = val.content;
    const name = val.name;
    const isBlock = content![0] === '{';
    const calcBlock = isBlock ? `(() => ${content})()` : content;

    return `let ${name}_arr = ${calcBlock};
    const is_${name}_array = Array.isArray(${name}_arr);
    ${name}_arr = is_${name}_array ? ${name}_arr : [${name}_arr];
    ${name}_arr.forEach(${name} => {
      vars.set('${name}', ${name});
      ${placeholder}
      });`;
  }

  // public calcContent(vars: Map<string, any>, content?: string): any {
  //   const gc = this.gcService;
  //   gc.vars = vars;
  //   //TODO rep
  //   const allVars = _.mapValues(_.keyBy(vars, 'name'), 'value');
  //   if (content && content.length > 2 && content[0] == "'" && content[content.length - 1] == "'") {
  //     // replace string e.g. 'N47 15.abc E8 10.def'
  //     content = content.replaceAll("'", "");
  //     return gc.replaceVars(content);
  //   }
  //   const evalContent = `${this.getEvalVars(vars)}

  //      ${content ?? "undefined"}`;
  //   try {
  //     return indirectEval(evalContent);
  //   } catch (e) {
  //     console.warn(`eval of "${evalContent}"`, vars, e);
  //     throw e;
  //   }
  // }

  private getEvalVars(vars: FormulaEditorVarValue[]) {
    return vars.map(i => `var ${i.name}=allVars['${i.name}'];
    `).join("");
  }


}
