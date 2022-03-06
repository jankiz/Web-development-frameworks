import { Component, OnInit } from '@angular/core';
import { GalleryObject } from '../../shared/constants/constants';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject: Array<any> = GalleryObject;
  chosenImage: any;

  constructor() { }

  ngOnInit(): void {
  }

  loadImage(imageObject: any) {
    this.chosenImage = imageObject;
  }

}
