import { Injectable } from '@angular/core';
import { TemperatureSpan } from '../models/temperature-span';
import { PressureSpan } from '../models/pressure-span';
import { Measurement } from '../models/measurement';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    public temperatureChanges = new Subject<number>();
    public pressureChanges = new Subject<number>();
    public temperatureHistoryChanges = new Subject<Measurement[]>();
    public pressureHistoryChanges = new Subject<Measurement[]>();

    private readonly measureTemperatureInterval = 7000;
    private readonly measurePressureInterval = 5000;
    private readonly temperatureSpan: TemperatureSpan;
    private readonly pressureSpan: PressureSpan;

    private pressureHistory: Measurement[] = [];
    private temperatureHistory: Measurement[] = [];

    constructor() {
        this.temperatureSpan = new TemperatureSpan(-20, 40);
        this.pressureSpan = new PressureSpan(1080, 1150);
        this.startMeasurements();
    }

    public getPressureHistory(): Measurement[] {
        return this.pressureHistory;
    }

    public getTemperatureHistory(): Measurement[] {
        return this.temperatureHistory;
    }

    public getLastTemperature(): number {
        const lastValue = (this.temperatureHistory.length > 0) ?
            this.temperatureHistory[0].measuredValue : 0
        return lastValue;
    }

    public getLastPressure(): number {
        const lastValue = (this.pressureHistory.length > 0) ?
            this.pressureHistory[0].measuredValue : 0
        return lastValue;
    }

    public readNewTemperature(): number {
        const newTemperature = this.getRandomValueBetween(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
        const newMeasurement = new Measurement(new Date().getTime(), newTemperature);
        this.temperatureHistory.push(newMeasurement);
        this.temperatureChanges.next(newTemperature);
        this.temperatureHistoryChanges.next(this.temperatureHistory);
        return newTemperature;
    }

    public readNewPressure(): number {
        const newPressure = this.getRandomValueBetween(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
        const newMeasurement = new Measurement(new Date().getTime(), newPressure);
        this.pressureHistory.push(newMeasurement);
        this.pressureChanges.next(newPressure);
        this.pressureHistoryChanges.next(this.pressureHistory);
        return newPressure;
    }

    private getRandomValueBetween(minVal: number, maxVal: number): number {
        return Math.round((maxVal - minVal) * Math.random() + minVal);
    }

    private startMeasurements(): void {
        setInterval(() => this.readNewTemperature(), this.measureTemperatureInterval);
        setInterval(() => this.readNewPressure(), this.measurePressureInterval);
    }

}
