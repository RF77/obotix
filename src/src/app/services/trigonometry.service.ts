import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrigonometryService {

  constructor() { }

  /**
   * Berechnet die Höhe in einem rechtwinkligen Dreieck
   * tan(α) = a / b => a = tan(α) * b
   * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
   * @param distance Distanz in Meter, auch b in Dreieckgrafik
   * @returns Höhe in Meter, auch a in Dreieckgrafik
   */
  public calculateHeightFromAngleAndDistance(angle: number, distance: number): number {
    return Math.tan(this.degreesToRadians(angle)) * distance;
  }

  /**
   * Berechnet die Distanz in einem rechtwinkligen Dreieck
   * tan(α) = a / b => a = tan(α) * b => b = a / tan(α)
   * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
   * @param height Höhe in Meter, auch a in Dreieckgrafik
   * @returns Distanz in Meter, auch b in Dreieckgrafik
   */
  public calculateDistanceFromAngleAndHeight(angle: number, height: number): number {
    return height / Math.tan(this.degreesToRadians(angle));
  }

  /**
   * Berechnet den Winkel wenn Distanz und Höhe in einem rechtwinkligen Dreieck bekannt sind
   * α = atan( a / b )
   * @param distance Distanz in Meter, auch b in Dreieckgrafik
   * @param height Höhe in Meter, auch a in Dreieckgrafik
   * @returns Winkel in Grad, auch alpha in Dreieckgrafik
   */
  public calculateAngleFromDistanceAndHeight(distance: number, height: number): number {
    return this.radiansToDegrees(Math.atan(height / distance));
  }

  public degreesToRadians(degrees: number) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  public radiansToDegrees(radians: number) {
    return radians * 180 / Math.PI;
  }
}
