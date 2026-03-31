import { GcCoordinate } from "../../../converter/GcCoordinate";
import { GcService } from "../../../services/gc.service";
export { };

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
    if(value: any, b: (v: any) => Boolean): any[];

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
    if(value: any, b: (v: any) => Boolean): any[];
    rangeTo(end: number): number[];
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
    if(value: any, b: (v: any) => Boolean): any[];
  }
}

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
String.prototype.if = function (b) { return GcService.instance.if(this.valueOf(), b); };
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
Array.prototype.if = function (b) { return GcService.instance.if(this.valueOf(), b); };

Number.prototype.sum = function () { return GcService.instance.sum(this.valueOf()); };
Number.prototype.iqs = function () { return GcService.instance.iqs(this.valueOf()); };
Number.prototype.qs = function () { return GcService.instance.qs(this.valueOf()); };
Number.prototype.convertBase = function (from, to) { return GcService.instance.convertBase(this, from, to); };
Number.prototype.pad = function (size: number) { return GcService.instance.pad(this.valueOf(), size); };
Number.prototype.if = function (b) { return GcService.instance.if(this.valueOf(), b); };
Number.prototype.round = function (decimals) { return GcService.instance.round(this.valueOf(), decimals); };
Number.prototype.rangeTo = function (to) { return GcService.instance.range(this.valueOf(), to); };
