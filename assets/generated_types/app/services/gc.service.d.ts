import { BuchstabenwortwertConverterService } from '../converter/buchstabenwortwert-converter.service';
import FormulaEditorVarValue from '../components/formula-editor/models/FormulaEditorVarValue';
import { CalcContent } from '../components/formula-editor/services/CalcContent';
import { GcCoordinate } from '../converter/GcCoordinate';
import { CoordinateConverterService } from '../converter/coordinate-converter.service';
import { TrigonometryService } from './trigonometry.service';
import { CoordinateService } from './coordinate.service';
/**
 * Dieser Service enthält alle verfügbaren Funktionen
 */
export declare class GcService {
    private bwwService;
    private coordinateConverterService;
    private trigonometryService;
    private coordinateService;
    static instance: GcService;
    constructor(bwwService: BuchstabenwortwertConverterService, coordinateConverterService: CoordinateConverterService, trigonometryService: TrigonometryService, coordinateService: CoordinateService);
    /**
     * Wird vom Solver gesetzt und enthält die aktuellen Variablenwerte
     * Soweit nicht angedacht, um im Solver von Hand zu benutzen
     */
    vars: FormulaEditorVarValue[];
    calcInterface: CalcContent | undefined;
    /**
     * Berechne die Buchstabenwerte eines Textes, A=1, Z=26, Ä=27...
     * @param text Text, der in einen Buchstabenwert umgewandelt werden soll
     * @returns Array aller Buchstabenwerte "ABC" gibt [1, 2, 3] zurück
     */
    bww(text: string): number[];
    /**
   * Berechne die Buchstabenwerte eines Textes, Z=1, A=26
   * @param text Text, der in einen Buchstabenwert umgewandelt werden soll
   * @returns Array aller Buchstabenwerte "ABC" gibt [26, 25, 24] zurück
   */
    bwwZtoA(text: string): number[];
    /**
     * Ersetzt die Variablen in einem Text. Bsp. Input: "N47 12.ABC" mit Variablenwerten A=1, B=2, C=3 ergibt den string "N47 12.123"
     * @param text Enthält den Text, in dem die Variablen ersetzt werden sollen
     * @returns Den Text mit den ersetzten Variablen
     */
    replaceVars(text: string): string;
    /**
     * Ersetzt normale Klammern so, dass dessen Inhalt berechnet wird. Bsp. Input: "N47 12.(A+B)(A*B)(B)" mit Variablenwerten A=1, B=2, C=3 ergibt den string "N47 12.322"
     * @param text Enthält den Text, in dem der Inhalt der Klammern ausgewertet werden soll
     * @returns Der berechnete Text, bei dem der Inhalt zwischen den Klammern berechnet wird und im string eingesetzt wird.
     */
    replaceBrackets(text: string): string;
    /**
     *
     * @param value Die Werte können in vielen Varianten übergeben werden. Jenachdem ist das Resultat unterschiedlich
     * Array von Zahlen: [1,2,3] => 6
     * string als Text: "ABC" => 6 (es wird BWW gebildet und von diesem die Summe zusammengezählt)
     * Nummer: 49 => 4 (es wird die iterierte QS der Zahl gebildet)
     * Array in Array => Subarrays werden zusammengezählt
     * @returns
     */
    sum(value: any): number;
    /**
     * Iterierte einstellige Quersumme einer Zahl
     * @param number Zahl von welcher die iterierte Quersumme berechnet werden soll
     * @returns einstellige Zahl, Bsp: 49 => 4
     */
    iqs(number: string | number): number;
    /**
     * Einfache Quersumme einer Zahl, die auch mehrstellig sein kann
     * @param number Zahl von welcher die Quersumme berechnet werden soll
     * @returns Quersumme, Bsp: 49 => 13
     */
    qs(number: string | number): number;
    /**
     * Berechnet die Summe aller Zahlen des Arrays
     * @param values Array von Nummern
     * @returns Bsp. [1,2,3] => 6
     */
    sumNumber(values: number[]): number;
    /**
     * Eliminiert doppelte Werte
     * @param values Array mit Werten
     * @returns keine doppelten Werte, Bsp: [1,2,2,3] => [1,2,3]
     */
    distinct(values: any[]): any[];
    /**
     * Eliminiert doppelte Werte, in dem das angegebene Property verglichen wird
     * @param values Array mit Werten
     * @param key Nach diesem Schlüssel wird verglichen
     * @returns keine doppelten Werte
     */
    distinctBy(values: any[], key: string): any[];
    /**
     * Parst eine Koordinate von verschiedenen Notationen
     * @param coordinate die zu parsende Koordinate
     * @returns
     */
    parseCoordinate(coordinate: string): GcCoordinate;
    /**
     * Konvertiert die Basis einer Zahl von einem gewissen Basissystem in ein anderes Basissystem
     * @param input Die Asugangszahl entweder als array von Werten oder einem einzelnen Wert
     * @param from Die Ausgangsbasis von 2 bis 36
     * @param to Die Zielbasis von 2 bis 36
     * @returns Die umgewandelte Zahl als string
     */
    convertBase(input: any, from: number, to: number): any;
    /**
     * Fügt Nullen vor eine Zahl
     * @param num die Nummer
     * @param size wie gross die Zahl werden soll
     * @returns Zahl mit Nullen als Text, Bsp: num=33, size=3 ergibt "033"
     */
    pad(num: number | string, size: number): string;
    /**
     * Es werden nur die Werte übernommen, welche die Bedingung erfüllen
     * @param value Wert
     * @param b Bedingung
     * @returns Wert, falls Bedingung erfüllt oder keinen Wert
     */
    when(value: any, b: (v: any) => boolean): any[];
    /**
   * Berechnet die Höhe in einem rechtwinkligen Dreieck
   * tan(alpha) = a / b => a = tan(alpha) * b
   * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
   * @param distance Distanz in Meter, auch b in Dreieckgrafik
   * @returns Höhe in Meter, auch a in Dreieckgrafik
   */
    calcHeightInTriangle(angle: number, distance: number): number;
    /**
     * Berechnet die Distanz in einem rechtwinkligen Dreieck
     * tan(alpha) = a / b => a = tan(alpha) * b => b = a / tan(alpha)
     * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
     * @param height Höhe in Meter, auch a in Dreieckgrafik
     * @returns Distanz in Meter, auch b in Dreieckgrafik
     */
    calcDistanceInTriangle(angle: number, height: number): number;
    /**
     * Berechnet den Winkel wenn Distanz und Höhe in einem rechtwinkligen Dreieck bekannt sind
     * alpha = atan( a / b )
     * @param distance Distanz in Meter, auch b in Dreieckgrafik
     * @param height Höhe in Meter, auch a in Dreieckgrafik
     * @returns Winkel in Grad, auch alpha in Dreieckgrafik
     */
    calcAngleInTriangle(distance: number, height: number): number;
    /**
     * Rundet eine Zahl auf die angebenene Anzahl von Dezimalstellen
     * @param num die zu rundende Zahl
     * @param decimals Anzahl Dezimalstellen
     * @returns gerundete Zahl, Bsp: 3.445677 auf 3 Stellen => 3.446
     */
    round(num: number, decimals: number): number;
    /**
     * Mache eine Peilung von einer Koordinate aus mit einer Distanz und dem Azimuth
     * @param coord Ursprungspunkt
     * @param distance Distanz in Meter
     * @param azimuth Winkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus
     * @returns Endpunkt als Koordinate
     */
    peile(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate;
    toSwissGrid(coordinate: GcCoordinate): string;
}
//# sourceMappingURL=gc.service.d.ts.map