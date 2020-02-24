import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  // returns a random-value between minVal and maxVal
  getRandomValue(minVal: number, maxVal: number): number {
    return Math.round((maxVal - minVal) * Math.random() + minVal);
  }

}
