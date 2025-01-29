import { Point } from '@turf/turf';
import { GcCoordinate } from '../converter/GcCoordinate';
/**
 * Verwendet um Manipulationen mit Koordinaten zu machen, wie peilen, Distanz berechnen
 */
export declare class CoordinateService {
    private converterService;
    distanceTo(source: GcCoordinate | string, target: GcCoordinate | string): number;
    initialBearingTo(source: GcCoordinate | string, target: GcCoordinate | string): number;
    finalBearingTo(source: GcCoordinate | string, target: GcCoordinate | string): number;
    finalBearingOn(coord: GcCoordinate | string, distance: number, initialAzimuth: number): number;
    peileRückwärts(targetCoordinate: GcCoordinate | string, distance: number, initialAzimuth: number): GcCoordinate;
    peile(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate;
    peile2(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate;
    peile3(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate;
    peile4(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate;
    toCoord(coord: GcCoordinate): Point;
    private getCoord;
}
//# sourceMappingURL=coordinate.service.d.ts.map