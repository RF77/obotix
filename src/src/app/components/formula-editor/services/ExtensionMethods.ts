import { GcService } from "../../../services/gc.service";
export { };

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


