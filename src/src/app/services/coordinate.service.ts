import { Injectable } from '@angular/core';
import { Point, bearingToAzimuth, destination, rhumbDestination } from '@turf/turf';
import * as geolib from 'geolib';
import { GcCoordinate } from '../converter/GcCoordinate';
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty.js';
import { CoordinateConverterService } from '../converter/coordinate-converter.service';
/**
 * Verwendet um Manipulationen mit Koordinaten zu machen, wie peilen, Distanz berechnen
 */
@Injectable({
  providedIn: 'root'
})
export class CoordinateService {

  constructor(private converterService: CoordinateConverterService) { }

  public distanceTo(source: GcCoordinate | string, target: GcCoordinate | string): number {
    console.debug("distance1()", source, target);
    const p1 = new LatLon(this.getCoord(source).latitude, this.getCoord(source).longitude);
    const p2 = new LatLon(this.getCoord(target).latitude, this.getCoord(target).longitude);
    console.debug("distance2()", p1, p2, source, target);
    const distance = p1.distanceTo(p2);
    return distance;
  }

  public initialBearingTo(source: GcCoordinate | string, target: GcCoordinate | string): number {
    const p1 = new LatLon(this.getCoord(source).latitude, this.getCoord(source).longitude);
    const p2 = new LatLon(this.getCoord(target).latitude, this.getCoord(target).longitude);
    const bearing = p1.initialBearingTo(p2);
    return bearing;
  }

  public finalBearingTo(source: GcCoordinate | string, target: GcCoordinate | string): number {
    const p1 = new LatLon(this.getCoord(source).latitude, this.getCoord(source).longitude);
    const p2 = new LatLon(this.getCoord(target).latitude, this.getCoord(target).longitude);
    const bearing = p1.finalBearingTo(p2);
    return bearing;
  }

  public finalBearingOn(coord: GcCoordinate | string, distance: number, initialAzimuth: number): number {
    const p1 = new LatLon(this.getCoord(coord).latitude, this.getCoord(coord).longitude);
    const bearing = p1.finalBearingOn(distance, initialAzimuth);
    return bearing;
  }

  public peileRückwärts(targetCoordinate: GcCoordinate | string, distance: number, initialAzimuth: number): GcCoordinate {
    const p1 = new LatLon(this.getCoord(targetCoordinate).latitude, this.getCoord(targetCoordinate).longitude);
    let targetAzimuth = (initialAzimuth + 180) % 360;
    let currentInitialAzimut = -10000;
    let maxIterations = 100;
    do {
      currentInitialAzimut = (p1.finalBearingOn(distance, targetAzimuth) + 180) % 360;
      maxIterations--;
      console.debug(`peileRückwärts(), targetAzimuth = ${targetAzimuth}, initialAzimuth = ${initialAzimuth}, currentInitialAzimut = ${currentInitialAzimut}`)
      targetAzimuth += (initialAzimuth - currentInitialAzimut);
    } while (maxIterations > 0 && Math.abs(currentInitialAzimut - initialAzimuth) > 0.000000001)

    const initialPoint = p1.destinationPoint(distance, targetAzimuth);

    return new GcCoordinate(initialPoint.latitude, initialPoint.longitude);
  }

  public peile(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate {
    const p1 = new LatLon(this.getCoord(coord).latitude, this.getCoord(coord).longitude);
    const dest = p1.destinationPoint(distance, azimuth);
    return new GcCoordinate(dest.latitude, dest.longitude);
  }

  //falsch
  public peile2(coord: GcCoordinate | string, distance: number, azimuth: number): GcCoordinate {
    const dest = geolib.computeDestinationPoint([this.getCoord(coord).longitude, this.getCoord(coord).latitude], distance, azimuth);
    return new GcCoordinate(dest.latitude, dest.longitude);
  }

  //falsch
  public peile3(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate {
    const dest = rhumbDestination([coord.longitude, coord.latitude], distance / 1000, azimuth);
    return new GcCoordinate(dest.geometry.coordinates[1], dest.geometry.coordinates[0]);
  }

  //falsch
  public peile4(coord: GcCoordinate, distance: number, azimuth: number): GcCoordinate {
    const dest = destination([coord.longitude, coord.latitude], distance / 1000, azimuth);
    return new GcCoordinate(dest.geometry.coordinates[1], dest.geometry.coordinates[0]);
  }

  public toCoord(coord: GcCoordinate): Point {
    return {} as Point;
  }

  private getCoord(coord: GcCoordinate | string): GcCoordinate {
    console.debug("getCoord()", coord);
    let c = coord as any;
    if (c.toString2) {
      c = c.toString2();
    }
    return this.converterService.parse(c.toString());
    // if (coord instanceof String) {
    //   return this.converterService.parse(coord.toString());
    // }
    // return coord as GcCoordinate;
  }

  // /**
  //  * 
  //  * @param azimuth Winkel in Uhrzeiger beginnend von Norden her
  //  * @returns beaing von N
  //  */
  // public convertAzimuthToBearing(azimuth: number) : number{

  // }
}
