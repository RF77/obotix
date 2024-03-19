import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TableModule } from 'primeng/table';
import { FormulaEditorComponent } from './components/formula-editor/formula-editor.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FormulaEditorResultTableComponent } from './components/formula-editor-result-table/formula-editor-result-table.component';
import { MenubarModule } from 'primeng/menubar';
import { FormulaEditorCreateNewComponent } from './components/formula-editor-create-new/formula-editor-create-new.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { DropdownModule } from 'primeng/dropdown';

const monacoConfig: NgxMonacoEditorConfig = {

  onMonacoLoad: async () => {
    const monaco = (<any>window).monaco;
    // monaco.languages.typescript.javascriptDefaults.addExtraLib([
    //   "declare class Facts {",
    //   "    /**",
    //   "     * Returns the next fact",
    //   "     */",
    //   "    static next():string",
    //   "}",
    // ].join("\n"));
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare class GcCoordinate {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
    /**
     * Ganze Grad der Latitude ohne die Minuten und immer positiv, auch wenn auf der Südhalbkugel, z.B. 47
     */
    get latitudeDegrees(): number;
    /**
     * Ganze Grad der Longitude ohne die Minuten und immer positiv, auch wenn im Westen, z.B. 8
     */
    get longitudeDegrees(): number;
    /**
     * Ganze Minuten der Latitude ohne die Bruchteile der Minuten
     */
    get latitudeMinutes(): number;
    /**
     * Ganze Minuten der Longitude ohne die Bruchteile der Minuten
     */
    get longitudeMinutes(): number;
    /**
     * Die 3 Nachkommastellen der Minute von den Koordinaten der Latitude
     */
    get latitudeMinute3Decimals(): number;
    /**
     * Die 3 Nachkommastellen der Minute von den Koordinaten der Longitude
     */
    get longitudeMinute3Decimals(): number;
    /**
     * Mache eine Peilung von einer Koordinate aus mit einer Distanz und dem Azimuth
     * @param distance Distanz in Meter
     * @param azimuth Winkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus
     * @returns Endpunkt als Koordinate
     */
    peile(distance: number, azimuth: number): GcCoordinate;
    toSwissGrid(): string;
    toString(): string;
}
    
    declare class Coordinate {
    /**
     * Peilt von den Ursprungskoordinaten in die angebene Richtung
     * @param distanz Distanz in Metern
     * @param azimuth Azimuth in Grad von Norden her in Uhrzeigerrichtung
     */
    static peile(distanz: number, azimuth: number): string;
    peileWeiter();
}
declare var coord:Coordinate;
`, 'file:///node_modules/generated_types/app/extensions/Coord.d.ts');
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`declare var gc:GcService;
/**
 * Dieser Service enthält alle verfügbaren Funktionen
 */
declare class GcService {
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
    toSwissGrid(coordinate: GcCoordinate): string;
}


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

`, monaco.Uri.file('assets/generated_types/app/services/gc.service.d.ts'));
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
    // const allLangs = editor.languages.getLanguages();
    // const lang = await allLangs.find((i: any) => i.id === 'javascript').loader();
    // lang.language.keywords.push("qqq");
    // console.log("editor..", allLangs, lang);
  } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    FormulaEditorComponent,
    FormulaEditorResultTableComponent,
    FormulaEditorCreateNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    ClipboardModule,
    FocusTrapModule,
    CheckboxModule,
    DropdownModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
