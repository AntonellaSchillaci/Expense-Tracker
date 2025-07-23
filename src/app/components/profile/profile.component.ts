import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = computed(() => this.authService.user());
  email = computed(() => this.user()?.email ?? 'Nessuna email');

  nome: string = '';
  username: string = '';
  bio: string = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private location: Location,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  goBack(): void {
    this.location.back();
  }

  async saveProfile(): Promise<void> {
    const uid = this.user()?.uid;
    if (!uid) return;

    const profileRef = doc(this.firestore, `profiles/${uid}`);
    const profileData = {
      email: this.user()?.email,
      nome: this.nome,
      username: this.username,
      bio: this.bio,
      updatedAt: new Date(),
    };

    try {
      await setDoc(profileRef, profileData, { merge: true });
      this.successMessage = 'Profilo aggiornato con successo!';
      this.errorMessage = '';
      setTimeout(() => (this.successMessage = ''), 3000);
    } catch (error) {
      console.error('Errore salvataggio profilo:', error);
      this.errorMessage = 'Errore durante il salvataggio. Riprova.';
      this.successMessage = '';
      setTimeout(() => (this.errorMessage = ''), 4000);
    }
  }

  async loadProfile(): Promise<void> {
    const uid = this.user()?.uid;
    if (!uid) return;

    const profileRef = doc(this.firestore, `profiles/${uid}`);
    try {
      const snap: DocumentSnapshot<DocumentData> = await getDoc(profileRef);
      if (snap.exists()) {
        const data = snap.data();
        this.nome = data?.['nome'] ?? '';
        this.username = data?.['username'] ?? '';
        this.bio = data?.['bio'] ?? '';
      }
    } catch (error) {
      console.error('Errore caricamento profilo:', error);
    }
  }
}
