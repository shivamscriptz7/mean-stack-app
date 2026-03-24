import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cities = [
    { label: 'Chandigarh', value: 'chandigarh' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Kolkata', value: 'kolkata' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Pune', value: 'pune' },
    { label: 'Jaipur', value: 'jaipur' },
    { label: 'Lucknow', value: 'lucknow' },
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Noida', value: 'noida' },
  ];

  selectedCity = 'chandigarh';
  customCity = '';

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchWeather(this.selectedCity);
  }

  onCityChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCity = select.value;
    this.customCity = '';
    this.fetchWeather(this.selectedCity);
  }

  onCustomCitySearch() {
    const trimmed = this.customCity.trim();
    if (!trimmed) return;
    this.fetchWeather(trimmed);
  }

  fetchWeather(city: string) {
    this.loading = true;
    this.error = '';
    this.weather = null;

    this.weatherService.getWeather(city).subscribe({
      next: (data: any) => {
        this.weather = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'City nahi mili. Dobara check karo.';
        this.loading = false;
      }
    });
  }
}