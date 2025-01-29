export declare class GcCoordinate {
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
    /**
    * Mache eine Peilung rückwärts, dass heisst die vorgegebene Kordinate entspricht dem Endpunkt.
    * @param distance Distanz in Meter
    * @param initialAzimuth Anfangswinkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus vom noch unklaren Ursprungspunkt
    * @returns Anfangspunkt als Koordinate
    */
    peileRückwärts(distance: number, initialAzimuth: number): GcCoordinate;
    distanceTo(target: GcCoordinate | string): number;
    peile2(distance: number, azimuth: number): GcCoordinate;
    toSwissGrid(): string;
    toString(): string;
}
//# sourceMappingURL=GcCoordinate.d.ts.map