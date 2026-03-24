import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  toast = { show: false, message: '', type: '' }; // type: 'success' | 'error'
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Helper getters for template
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 3000);
  }

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
        setTimeout(() => this.router.navigate(['/products']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Invalid username or password', 'error');
      }
    });
  }
}
