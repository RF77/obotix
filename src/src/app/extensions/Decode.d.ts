declare class Decode {
    /**
     * Peilt von den Ursprungskoordinaten in die angebene Richtung
     * @param distanz Distanz in Metern
     * @param azimuth Azimuth in Grad von Norden her in Uhrzeigerrichtung
     */
    static peile(distanz: number, azimuth: number): string;
}

declare class Facts {
    /**
     * Returns the next fact
     */
    static next(): string
}

String.prototype.bww = function () { return bww(this, false); };

interface String {
    foo(): void
}

String.prototype.foo = () => { console.log("bar") }

"aksljflasd".foo();