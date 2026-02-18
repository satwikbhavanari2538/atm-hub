import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  pin = '';
  error = signal<string | null>(null);
  masterPin = '0265'; // Derived from Satwik's secret pattern

  constructor(private router: Router) {}

  verifyPin() {
    console.log('Verifying PIN:', this.pin);
    if (this.pin === this.masterPin) {
      localStorage.setItem('atm_authenticated', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set('Invalid Access PIN. Access Denied.');
      this.pin = '';
    }
  }

  onPinInput(event: any) {
    const val = event.target.value;
    if (val.length === 4) {
      this.verifyPin();
    }
  }
}
