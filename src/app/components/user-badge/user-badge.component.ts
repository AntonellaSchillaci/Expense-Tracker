import { Component, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
})
export class UserBadgeComponent {
  user;
  initial;
  bgColor: string;
  isMenuOpen = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
    this.initial = computed(
      () => this.user()?.email?.charAt(0).toUpperCase() ?? '?'
    );
    this.bgColor = this.getRandomColor();
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  onCompleteProfile() {
    this.isMenuOpen.set(false);
    this.router.navigate(['/profile']);
  }

  getRandomColor(): string {
    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
      '#ffc107',
      '#ff9800',
      '#ff5722',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-badge-container')) {
      this.isMenuOpen.set(false);
    }
  }
}
