import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  weather: any = null;
  loading = true;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe({
      next: (data:any) => {
        this.weather = data;
        this.loading = false;
      },
      error: (err:any) => {
        this.error = 'Weather data load nahi ho saka.';
        this.loading = false;
      }
    });
  }

}


