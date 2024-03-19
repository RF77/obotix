import { GcService } from "../services/gc.service";

export class GcCoordinate {
    constructor(public latitude: number, public longitude: number) { }

    /**
     * Ganze Grad der Latitude ohne die Minuten und immer positiv, auch wenn auf der Südhalbkugel, z.B. 47
     */
    public get latitudeDegrees() {
        return Math.abs(Math.trunc(this.latitude));
    }

    /**
     * Ganze Grad der Longitude ohne die Minuten und immer positiv, auch wenn im Westen, z.B. 8
     */
    public get longitudeDegrees() {
        return Math.abs(Math.trunc(this.longitude));
    }

    /**
     * Ganze Minuten der Latitude ohne die Bruchteile der Minuten
     */
    public get latitudeMinutes() {
        return Math.abs(Math.trunc((this.latitude - Math.trunc(this.latitude)) * 60));
    }

    /**
     * Ganze Minuten der Longitude ohne die Bruchteile der Minuten
     */
    public get longitudeMinutes() {
        return Math.abs(Math.trunc((this.longitude - Math.trunc(this.longitude)) * 60));
    }

    /**
     * Die 3 Nachkommastellen der Minute von den Koordinaten der Latitude
     */
    public get latitudeMinute3Decimals() {
        const lat = (this.latitude - Math.trunc(this.latitude)) * 60;
        return Math.abs(Math.round((lat - Math.trunc((this.latitude - Math.trunc(this.latitude)) * 60)) * 1000));
    }

    /**
     * Die 3 Nachkommastellen der Minute von den Koordinaten der Longitude
     */
    public get longitudeMinute3Decimals() {
        const lon = (this.longitude - Math.trunc(this.longitude)) * 60;
        return Math.abs(Math.round((lon - Math.trunc((this.longitude - Math.trunc(this.longitude)) * 60)) * 1000));
    }

    /**
     * Mache eine Peilung von einer Koordinate aus mit einer Distanz und dem Azimuth
     * @param distance Distanz in Meter
     * @param azimuth Winkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus
     * @returns Endpunkt als Koordinate
     */
    public peile(distance: number, azimuth: number) {
        return GcService.instance.peile(this, distance, azimuth);
    }

    /**
    * Mache eine Peilung rückwärts, dass heisst die vorgegebene Kordinate entspricht dem Endpunkt.
    * @param distance Distanz in Meter
    * @param initialAzimuth Anfangswinkel von 0 bis 360 Grad in Uhrzeigersinn von Norden aus vom noch unklaren Ursprungspunkt
    * @returns Anfangspunkt als Koordinate
    */
    public peileRückwärts(distance: number, initialAzimuth: number): GcCoordinate {
        return GcService.instance.peileRückwärts(this, distance, initialAzimuth);
    }

    public distanceTo(target: GcCoordinate | string): number {
        return GcService.instance.distanceTo(this, target);
    }

    public peile2(distance: number, azimuth: number) {
        return GcService.instance.peile2(this, distance, azimuth);
    }

    public toSwissGrid() {
        return GcService.instance.toSwissGrid(this);
    }

    public toString() {
        return `${this.latitude >= 0 ? 'N' : 'S'}${this.latitudeDegrees} ${this.latitudeMinutes}.${GcService.instance.pad(this.latitudeMinute3Decimals, 3)} ${this.longitude >= 0 ? 'E' : 'W'}${this.longitudeDegrees} ${this.longitudeMinutes}.${GcService.instance.pad(this.longitudeMinute3Decimals, 3)}`;
    }
}
