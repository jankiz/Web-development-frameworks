import { Component, OnInit } from '@angular/core';
import { GalleryObject } from '../../shared/constants/constants';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject: any = GalleryObject;

  constructor() { }

  ngOnInit(): void {
  }

  reload() {
    
  }

}
