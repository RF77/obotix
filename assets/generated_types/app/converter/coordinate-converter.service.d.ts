import { GcCoordinate } from './GcCoordinate';
export declare class CoordinateConverterService {
    private lv95;
    private lv03;
    parse(coordinateText: string): GcCoordinate;
    /**
     * Parst Koordinaten und wirft Exception, falls das nicht geht
     * @param coordinateText Hier muss die Koordinate im Format von Google sein, z.B. "47.495102, 8.287153"
     * @returns GcCoordinate Objekt
     */
    parsePlainLatLong(coordinateText: string): GcCoordinate | null;
    /**
     * Parst die Koordinaten aus einem Array.
     * @param cordinateArray Erste Zahl im Array ist die Latitude, die zweite ist die Longitude
     * @returns GcCoordinate Objekt
     */
    parseLatLongFromArray(cordinateArray: number[]): GcCoordinate | null;
    parseSwissGrid(coordinateText: string): GcCoordinate | null;
    toSwissGrid(coordinate: GcCoordinate): string;
    constructor();
}
//# sourceMappingURL=coordinate-converter.service.d.ts.map