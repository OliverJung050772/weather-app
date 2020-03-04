import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Measurement } from '../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getTemperatures(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>('/api/Temperatures');
  }

  getPressures(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>('api/Pressures');
  }
}
