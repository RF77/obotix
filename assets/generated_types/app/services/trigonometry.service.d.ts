export declare class TrigonometryService {
    constructor();
    /**
     * Berechnet die Höhe in einem rechtwinkligen Dreieck
     * tan(α) = a / b => a = tan(α) * b
     * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
     * @param distance Distanz in Meter, auch b in Dreieckgrafik
     * @returns Höhe in Meter, auch a in Dreieckgrafik
     */
    calculateHeightFromAngleAndDistance(angle: number, distance: number): number;
    /**
     * Berechnet die Distanz in einem rechtwinkligen Dreieck
     * tan(α) = a / b => a = tan(α) * b => b = a / tan(α)
     * @param angle Winkel in Grad, auch alpha in Dreieckgrafik
     * @param height Höhe in Meter, auch a in Dreieckgrafik
     * @returns Distanz in Meter, auch b in Dreieckgrafik
     */
    calculateDistanceFromAngleAndHeight(angle: number, height: number): number;
    /**
     * Berechnet den Winkel wenn Distanz und Höhe in einem rechtwinkligen Dreieck bekannt sind
     * α = atan( a / b )
     * @param distance Distanz in Meter, auch b in Dreieckgrafik
     * @param height Höhe in Meter, auch a in Dreieckgrafik
     * @returns Winkel in Grad, auch alpha in Dreieckgrafik
     */
    calculateAngleFromDistanceAndHeight(distance: number, height: number): number;
    degreesToRadians(degrees: number): number;
    radiansToDegrees(radians: number): number;
}
//# sourceMappingURL=trigonometry.service.d.ts.map