import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
    this.initial = computed(
      () => this.user()?.email?.charAt(0).toUpperCase() ?? '?'
    );
    this.bgColor = this.getRandomColor();
  }

  getRandomColor() : string {
    const colors = [
      '#f44336', // red
      '#e91e63', // pink
      '#9c27b0', // purple
      '#673ab7', // deep purple
      '#3f51b5', // indigo
      '#2196f3', // blue
      '#03a9f4', // light blue
      '#00bcd4', // cyan
      '#009688', // teal
      '#4caf50', // green
      '#8bc34a', // light green
      '#cddc39', // lime
      '#ffeb3b', // yellow
      '#ffc107', // amber
      '#ff9800', // orange
      '#ff5722', // deep orange
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }
}
