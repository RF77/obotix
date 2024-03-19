import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuchstabenwortwertConverterService {

  constructor() {

  }

  convertStringToNumbers(text: String | undefined, inverted: boolean = false): number[] {
    if (text == null) {
      return [];
    }
    const firstChar = inverted ? "Z".charCodeAt(0) : "A".charCodeAt(0);
    const lastChar = inverted ? "A".charCodeAt(0) : "Z".charCodeAt(0);
    const values = text.split('').map(b => {
      const ub = b.toUpperCase();
      const charValue = ub.charCodeAt(0);

      if (inverted) {
        if (b == 'ß') {
          return 0;
        }
        if (charValue >= lastChar && charValue <= firstChar) {
          return firstChar - charValue + 1;
        }
        return 0;
      } else {
        if (b == 'ß') {
          return 30;
        }
        if (charValue >= firstChar && charValue <= lastChar) {
          return charValue - firstChar + 1;
        }
        if (ub == 'Ä') {
          return 27;
        }
        if (ub == 'Ö') {
          return 28;
        }
        if (ub == 'Ü') {
          return 29;
        }

        return 0;
      }
    });
    return values;
  }
}
