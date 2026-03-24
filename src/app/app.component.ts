import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';

  constructor(private router: Router) {}

  // Returns true if user is logged in (token exists in localStorage)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Clears all localStorage data and redirects to login page
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}