import { Component, OnInit } from '@angular/core';
import { ProfileObject } from '../../shared/constant';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // Eredeti profileObject tömb
  ProfileObject = ProfileObject;
  
  // A kiválasztott profil indexe
  selectedIndex: number = 0;

  ngOnInit(): void {
    // Kezdeti index beállítása
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    // Az index beállítása a kiválasztott option alapján
    this.selectedIndex = index;
  }
}