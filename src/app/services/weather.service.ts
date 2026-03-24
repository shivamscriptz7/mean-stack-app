// ng generate service weather
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '4c51303acfbc5ce5d61596314fe6a7b0'; // apna key daal
  private city = 'chandigarh'; // ya koi bhi city

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
    );
  }
  
}



