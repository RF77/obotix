import { Point } from '@turf/turf';
import { GcCoordinate } from '../converter/GcCoordinate';
/**
 * Verwendet um Manipulationen mit Koordinaten zu machen, wie peilen, Distanz berechnen
 */
export declare class CoordinateService {
    constructor();
    peile(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate;
    toCoord(coord: GcCoordinate): Point;
}
//# sourceMappingURL=coordinate.service.d.ts.map