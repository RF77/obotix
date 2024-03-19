import { FormulaEditorResultModel } from "./FormulaEditorResultModel";
import { FormulaEditorConfigurationModel } from "./FormulaEditorConfigurationModel";


export class FormulaEditorModel {
    configuration: FormulaEditorConfigurationModel = new FormulaEditorConfigurationModel();
    result: FormulaEditorResultModel = new FormulaEditorResultModel();
}
