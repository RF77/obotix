import { Injectable } from '@angular/core';
import { BuchstabenwortwertConverterService } from '../converter/buchstabenwortwert-converter.service';
import FormulaEditorVarValue from '../components/formula-editor/models/FormulaEditorVarValue';
import { CalcContent } from '../components/formula-editor/services/CalcContent';
import { GcCoordinate } from '../converter/GcCoordinate';
import { CoordinateConverterService } from '../converter/coordinate-converter.service';
import { BaseConverter } from '@nodecfdi/base-converter';
import { TrigonometryService } from './trigonometry.service';
import { CoordinateService } from './coordinate.service';

/**
 * Dieser Service enthält alle verfügbaren Funktionen
 */
@Injectable({
  providedIn: 'root'
})
export class GcService {

  public static instance: GcService;

  constructor(private bwwService: BuchstabenwortwertConverterService,
    private coordinateConverterService: CoordinateConverterService,
    private trigonometryService: TrigonometryService,
    public coordinateService: CoordinateService) {
    GcService.instance = this;
  }

  /**
   * Wird vom Solver gesetzt und enthält die aktuellen Variablenwerte
   * Soweit nicht angedacht, um im Solver von Hand zu benutzen
   */
  public vars: FormulaEditorVarValue[] = []
  public calcInterface: CalcContent | undefined;

  /**
   * Berechne die Buchstabenwerte eines Textes, A=1, Z=26, Ä=27...
   * @param text Text, der in einen Buchstabenwert umgewandelt werden soll
   * @returns Array aller Buchstabenwerte "ABC" gibt [1, 2, 3] zurück
   */
  public bww(text: string): number[] {
    return this.bwwService.convertStringToNumbers(text, false);
  }
  /**
 * Berechne die Buchstabenwerte eines Textes, Z=1, A=26
 * @param text Text, der in einen Buchstabenwert umgewandelt werden soll
 * @returns Array aller Buchstabenwerte "ABC" gibt [26, 25, 24] zurück
 */
  public bwwZtoA(text: string): number[] {
    return this.bwwService.convertStringToNumbers(text, true);
  }

  /**
   * Ersetzt die Variablen in einem Text. Bsp. Input: "N47 12.ABC" mit Variablenwerten A=1, B=2, C=3 ergibt den string "N47 12.123"
   * @param text Enthält den Text, in dem die Variablen ersetzt werden sollen
   * @returns Den Text mit den ersetzten Variablen
   */
  public replaceVars(text: string): string {
    this.vars.forEach(v => text = text.replaceAll(v.name, v.value));
    return text;
  }

  /**
   * Ersetzt normale Klammern so, dass dessen Inhalt berechnet wird. Bsp. Input: "N47 12.(A+B)(A*B)(B)" mit Variablenwerten A=1, B=2, C=3 ergibt den string "N47 12.322"
   * @param text Enthält den Text, in dem der Inhalt der Klammern ausgewertet werden soll
   * @returns Der berechnete Text, bei dem der Inhalt zwischen den Klammern berechnet wird und im string eingesetzt wird.
   */
  public replaceBrackets(text: string): string {
    const newText = text.replaceAll('(', '${').replaceAll(')', '}');
    return this.calcInterface?.calcContent(this.vars, `${'`'}${newText}${'`'}`);
  }

  /**
   * 
   * @param value Die Werte können in vielen Varianten übergeben werden. Jenachdem ist das Resultat unterschiedlich
   * Array von Zahlen: [1,2,3] => 6
   * string als Text: "ABC" => 6 (es wird BWW gebildet und von diesem die Summe zusammengezählt)
   * Nummer: 49 => 4 (es wird die iterierte QS der Zahl gebildet)
   * Array in Array => Subarrays werden zusammengezählt
   * @returns 
   */
  public sum(value: any): number {
    if (value == null) {
      return 0;
    }
    if (Array.isArray(value)) {
      if (value.length < 1) {
        return 0;
      }
      const firstElement = value[0];
      if (Array.isArray(firstElement)) {
        // console.debug("sum array in array", value);
        // return value.map(i => this.sum(i));
        throw new Error("sum von Array nicht unterstützt. Benutze .map()")
      } else if (isNaN(Number(firstElement))) {
        // console.debug("sum array of strings", value);
        // return value.map(i => this.sum(i));
        throw new Error("sum von Array nicht unterstützt. Benutze .map()")
      } else {
        //are numbers
        console.debug("sum array of numbers", value);
        return this.sumNumber(value.map(i => Number(i)));
      }
    } else {
      const number = Number(value);
      const isNumber = isNaN(number);
      if (!isNumber) {
        // text e.g. 'Hallo' => BWW und davon die Summe rechnen
        console.debug("sum text", value);
        return this.sumNumber(this.bww(value.toString()));
      } else {
        // reine Zahl => iqs
        console.debug("sum number => iqs", value);
        return this.iqs(value);
      }
    }
  }

  /**
   * Iterierte einstellige Quersumme einer Zahl
   * @param number Zahl von welcher die iterierte Quersumme berechnet werden soll
   * @returns einstellige Zahl, Bsp: 49 => 4
   */
  public iqs(number: string | number): number {
    const qs = this.qs(number);
    const qsText = qs.toString();
    if (qsText.length == 1) {
      return qs;
    }
    return this.iqs(qsText);
  }

  /**
   * Einfache Quersumme einer Zahl, die auch mehrstellig sein kann
   * @param number Zahl von welcher die Quersumme berechnet werden soll
   * @returns Quersumme, Bsp: 49 => 13
   */
  public qs(number: string | number): number {
    if (number == null) {
      return 0;
    }
    const text: string = number.toString();
    if (text.length > 0) {
      return this.sumNumber(text.split('').map(i => Number(i)));
    }
    return 0;
  }

  /**
   * Berechnet die Summe aller Zahlen des Arrays
   * @param values Array von Nummern
   * @returns Bsp. [1,2,3] => 6
   */
  public sumNumber(values: number[]): number {
    if (values.length < 1) {
      return 0;
    }
    return values.reduce((ty, u) => ty + u, 0);
  }

  /**
   * Eliminiert doppelte Werte
   * @param values Array mit Werten
   * @returns keine doppelten Werte, Bsp: [1,2,2,3] => [1,2,3]
   */
  public distinct(values: any[]): any[] {
    if (values == null) {
      return [];
    }
    if (values.length < 1) {
      return [];
    }
    return [...new Set(values)];
  }

  /**
   * Eliminiert doppelte Werte, in dem das angegebene Property verglichen wird
   * @param values Array mit Werten
   * @param key Nach diesem Schlüssel wird verglichen
   * @returns keine doppelten Werte
   */
  public distinctBy(values: any[], key: string): any[] {
    if (values == null) {
      return [];
    }
    if (values.length < 1) {
      return [];
    }
    const arrayUniqueByKey = [...new Map(values.map(item =>
      [item[key.toString()], item])).values()];

    return arrayUniqueByKey;
  }

  /**
   * Parst eine Koordinate von verschiedenen Notationen
   * @param coordinate die zu parsende Koordinate
   * @returns 
   */
  public parseCoordinate(coordinate: string): GcCoordinate {
    return this.coordinateConverterService.parse(coordinate);
  }

  /**
   * Konvertiert die Basis einer Zahl von einem gewissen Basissystem in ein anderes Basissystem 
   * @param input Die Asugangszahl entweder als array von Werten oder einem einzelnen Wert
   * @param from Die Ausgangsbasis von 2 bis 36
   * @param to Die Zielbasis von 2 bis 36
   * @returns Die umgewandelte Zahl als string
   */
  public convertBase(input: any, from: number, to: number): any {
    if (input == null) {
      return [];
    }
    if (Array.isArray(input)) {
      if (input.length < 1) {
        return [];
      }
      console.log("convertBase of array", input);
      return (input as any[]).map(i => this.convertBase(i, from, to));
    } else {
      const inputString = input.toString() as string;
      const splitItems = inputString.split(' ').filter(i => i.length > 0);
      if (splitItems.length > 1) {
        return splitItems.map(i => this.convertBase(i, from, to));
      }
      const converter = BaseConverter.createBase36();
      return converter.convert(input.toString(), from, to);
    }
  }

  /**
   * Fügt Nullen vor eine Zahl
   * @param num die Nummer
   * @param size wie gross die Zahl werden soll
   * @returns Zahl mit Nullen als Text, Bsp: num=33, size=3 ergibt "033"
   */
  public pad(num: number | string, size: number) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  /**
   * Es werden nur die Werte übernommen, welche die Bedingung erfüllen
   * @param value Wert
   * @param b Bedingung
   * @returns Wert, falls Bedingung erfüllt oder keinen Wert
   */
  public when(value: any, b: (v: any) => boolean): any[] {
    return b(value) ? value : [];
  }

  /**
 * Berechnet die Höhe in einem rechtwinkligen Dreieck
 * tan(alpha) = a / b => a = tan(alpha) * b
 * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
 * @param distance Distanz in Meter, auch b in Dreieckgrafik
 * @returns Höhe in Meter, auch a in Dreieckgrafik
 */
  public calcHeightInTriangle(angle: number, distance: number): number {
    return this.trigonometryService.calculateHeightFromAngleAndDistance(angle, distance);
  }

  /**
   * Berechnet die Distanz in einem rechtwinkligen Dreieck
   * tan(alpha) = a / b => a = tan(alpha) * b => b = a / tan(alpha)
   * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
   * @param height Höhe in Meter, auch a in Dreieckgrafik
   * @returns Distanz in Meter, auch b in Dreieckgrafik
   */
  public calcDistanceInTriangle(angle: number, height: number): number {
    return this.trigonometryService.calculateDistanceFromAngleAndHeight(angle, height);
  }

  /**
   * Berechnet den Winkel wenn Distanz und Höhe in einem rechtwinkligen Dreieck bekannt sind
   * alpha = atan( a / b )
   * @param distance Distanz in Meter, auch b in Dreieckgrafik
   * @param height Höhe in Meter, auch a in Dreieckgrafik
   * @returns Winkel in Grad, auch alpha in Dreieckgrafik
   */
  public calcAngleInTriangle(distance: number, height: number): number {
    return this.trigonometryService.calculateAngleFromDistanceAndHeight(distance, height);
  }

  /**
   * Rundet eine Zahl auf die angebenene Anzahl von Dezimalstellen
   * @param num die zu rundende Zahl
   * @param decimals Anzahl Dezimalstellen
   * @returns gerundete Zahl, Bsp: 3.445677 auf 3 Stellen => 3.446
   */
  public round(num: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    const mulNummer = num * multiplier;
    return Math.round(mulNummer) / multiplier;
  }

  /**
   * Mache eine Peilung von einer Koordinate aus mit einer Distanz und dem Azimuth
   * @param coord Ursprungspunkt
   * @param distance Distanz in Meter
   * @param azimuth Winkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus
   * @returns Endpunkt als Koordinate
   */
  public peile(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate {
    return this.coordinateService.peile(coord, distance, azimuth)
  }

  /**
 * Mache eine Peilung rückwärts.
 * @param targetCoordinate Zielpunkt
 * @param distance Distanz in Meter
 * @param initialAzimuth Anfangswinkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus vom noch unklaren Ursprungspunkt
 * @returns Anfangspunkt als Koordinate
 */
  public peileRückwärts(targetCoordinate: GcCoordinate | string, distance: number, initialAzimuth: number): GcCoordinate {
    return this.coordinateService.peileRückwärts(targetCoordinate, distance, initialAzimuth);
  }

  public peile2(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate {
    return this.coordinateService.peile2(coord, distance, azimuth)
  }

  // TODO eigenes Swissgrid Objekt
  public toSwissGrid(coordinate: GcCoordinate): string {
    return this.coordinateConverterService.toSwissGrid(coordinate);
  }

  public distanceTo(source: GcCoordinate | string, target: GcCoordinate | string): number {
    return this.coordinateService.distanceTo(source, target);
  }

  public c() {
    return this.coordinateService;
  }
}
