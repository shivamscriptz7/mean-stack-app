import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Custom validator: no spaces allowed in username
function noSpaces(control: AbstractControl): ValidationErrors | null {
  return control.value?.includes(' ') ? { noSpaces: true } : null;
}

// Custom validator: strong password
// Must have min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
function strongPassword(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const errors: any = {};

  if (value.length < 8)              errors['minLength']    = true;
  if (!/[A-Z]/.test(value))          errors['noUppercase']  = true;
  if (!/[a-z]/.test(value))          errors['noLowercase']  = true;
  if (!/[0-9]/.test(value))          errors['noNumber']     = true;
  if (!/[^A-Za-z0-9]/.test(value))   errors['noSpecial']    = true;

  return Object.keys(errors).length ? errors : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), noSpaces]],
    password: ['', [Validators.required, strongPassword]]
  });

  // Getters for easy template access
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  // Input focus style handler
  onFocus(event: Event) {
    (event.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.08)';
  }

  // Input blur style handler
  onBlur(event: Event) {
    (event.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.05)';
  }

  // Toggle show/hide password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Show toast message for 3 seconds
  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 3000);
  }

  // Form submit handler
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.showToast('Account created! Redirecting to login...', 'success');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.showToast(err.error?.message || 'Registration failed. Try again.', 'error');
      }
    });
  }
}