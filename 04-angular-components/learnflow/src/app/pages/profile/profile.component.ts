import { Component } from '@angular/core';
import { ProfileObject } from '../../shared/constant';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profileObject: any = ProfileObject;

  reload () {
  }

}
