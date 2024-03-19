import { FormulaEditorModel } from '../models/FormulaEditorModel';
import FormulaEditorVarValue from '../models/FormulaEditorVarValue';
import { GcService } from '../../../services/gc.service';
import { CalcContent } from './CalcContent';
import { GcCoordinate } from '../../../converter/GcCoordinate';
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
    constructor(gcService: GcService);
    calculateResult(model: FormulaEditorModel): string | null;
    private setRowResult;
    calcContent(vars: FormulaEditorVarValue[], content?: string): any;
    private getEvalVars;
}
//# sourceMappingURL=calculate-result.service.d.ts.map