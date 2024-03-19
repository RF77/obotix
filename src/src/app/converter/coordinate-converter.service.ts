import { Injectable } from '@angular/core';
import { GcCoordinate } from './GcCoordinate';
import { convert } from 'geo-coordinates-parser'
import proj4 from 'proj4';

@Injectable({
  providedIn: 'root'
})
export class CoordinateConverterService {
  private lv95 = "+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=cr";
  private lv03 = "+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs";

  parse(coordinateText: string): GcCoordinate {
    console.debug("parse Coordinate", coordinateText);
    const plain = this.parsePlainLatLong(coordinateText);
    if (plain) {
      return plain;
    }

    const swissgrid = this.parseSwissGrid(coordinateText);
    if (swissgrid) {
      return swissgrid;
    }

    const coordinate: any = convert(coordinateText, 9);
    return new GcCoordinate(coordinate.decimalLatitude, coordinate.decimalLongitude);
  }

  /**
   * Parst Koordinaten und wirft Exception, falls das nicht geht
   * @param coordinateText Hier muss die Koordinate im Format von Google sein, z.B. "47.495102, 8.287153"
   * @returns GcCoordinate Objekt
   */
  parsePlainLatLong(coordinateText: string): GcCoordinate | null {
    const matches = /^[\d.,\s]+$/.test(coordinateText);
    if (!matches) {
      return null;
    }
    const split = coordinateText.split(',').map(i => Number(i));
    return this.parseLatLongFromArray(split);
  }

  /**
   * Parst die Koordinaten aus einem Array.
   * @param cordinateArray Erste Zahl im Array ist die Latitude, die zweite ist die Longitude
   * @returns GcCoordinate Objekt
   */
  parseLatLongFromArray(cordinateArray: number[]): GcCoordinate | null {
    return new GcCoordinate(cordinateArray[0], cordinateArray[1]);
  }

  parseSwissGrid(coordinateText: string): GcCoordinate | null {
    const trimmedText = coordinateText.replaceAll(" ", "");
    const matches = /^[\d]{6,7}\/[\d]{6,7}/.test(trimmedText);
    if (!matches) {
      return null;
    }
    const split = coordinateText.split('/').map(i => Number(i));
    const x = split[0];
    const y = split[1];
    const point = proj4(x > 1000000 ? this.lv95 : this.lv03, 'WGS84').forward([x, y]);

    return this.parseLatLongFromArray([point[1], point[0]]);
  }

  toSwissGrid(coordinate: GcCoordinate): string {
    const point = proj4('WGS84', this.lv03).forward([coordinate.longitude, coordinate.latitude]);

    return `${Math.trunc(point[0])} / ${Math.trunc(point[1])}`;
  }

  constructor() { }
}


