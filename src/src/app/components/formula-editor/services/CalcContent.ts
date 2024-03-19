import FormulaEditorVarValue from '../models/FormulaEditorVarValue';

// String.prototype.bww = function () { return "Hallo"; };
// Array.prototype.xy = function (o) {
//   // code to remove "o"
//   return this;
// }
export interface CalcContent {
    calcContent(vars: FormulaEditorVarValue[], content?: string): any;
}
