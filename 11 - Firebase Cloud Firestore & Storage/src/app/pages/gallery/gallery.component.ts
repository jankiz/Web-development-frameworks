import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      console.log(data);
      this.galleryObject = data;
    })
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
  }

}
