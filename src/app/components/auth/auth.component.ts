import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email = '';
  password = '';
  isLogin = true;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  async submit(): Promise<void> {
    this.error = '';
    try {
      if (this.isLogin) {
        await this.authService.login(this.email, this.password);
      } else {
        await this.authService.register(this.email, this.password);
      }

      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message || "Errore durante l'autenticazione.";
    }
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.error = '';
  }
}
