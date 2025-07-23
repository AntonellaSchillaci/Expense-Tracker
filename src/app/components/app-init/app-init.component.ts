import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-init',
  standalone: true,
  template: '',
})
export class AppInitComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const isLoggedIn = this.auth.uid !== null;

    if (isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
