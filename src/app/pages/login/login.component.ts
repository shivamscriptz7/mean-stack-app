import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Toast notification state
  toast = { show: false, message: '', type: '' };

  // Loading state for submit button
  loading = false;

  // Toggle password visibility
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Reactive form with validators
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Getters for easy template access
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  // Toggle show/hide password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Input focus style handler
  onFocus(event: Event) {
    (event.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.08)';
  }

  // Input blur style handler
  onBlur(event: Event) {
    (event.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.05)';
  }

  // Show toast message for 3 seconds
  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 3000);
  }

  // Form submit handler
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.authService.saveToken(res.token);
        this.showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Invalid username or password', 'error');
      }
    });
  }
}