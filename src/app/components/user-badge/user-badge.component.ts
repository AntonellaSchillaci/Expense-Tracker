import {
  Component,
  computed,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
})
export class UserBadgeComponent implements OnInit {
  user;
  initial;
  bgColor: string;
  isMenuOpen = signal(false);
  photoURL = signal<string | null>(null); // 👈 immagine profilo

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore
  ) {
    this.user = this.authService.user;
    this.initial = computed(
      () => this.user()?.email?.charAt(0).toUpperCase() ?? '?'
    );
    this.bgColor = this.getRandomColor();
  }

  ngOnInit(): void {
    const uid = this.user()?.uid;
    if (!uid) return;

    const profileRef = doc(this.firestore, `profiles/${uid}`);
    getDoc(profileRef).then((snap: DocumentSnapshot<DocumentData>) => {
      if (snap.exists()) {
        const data = snap.data();
        this.photoURL.set(data?.['photoURL'] ?? null);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  onCompleteProfile(): void {
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
