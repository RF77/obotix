import { FormulaEditorModel } from '../models/FormulaEditorModel';
import { FormulaEditorRowResult } from '../models/FormulaEditorRowResult';
import { FormulaEditorRowModel } from '../models/FormulaEditorRowModel';
import { CalcContent } from './CalcContent';
import { GcCoordinate } from '../../../converter/GcCoordinate';
import "./ExtensionMethods";
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
export declare class CalculateResultService implements CalcContent {
    private gcService;
    constructor();
    calculateResult(model: FormulaEditorModel): string | null;
    beispiel(model: FormulaEditorModel): FormulaEditorRowResult[];
    getEvalText(model: FormulaEditorModel): string;
    getTextForLastVal(val: FormulaEditorRowModel): string;
    getTextForVal(val: FormulaEditorRowModel): string;
    private getEvalVars;
}
//# sourceMappingURL=calculate-result.service.d.ts.map