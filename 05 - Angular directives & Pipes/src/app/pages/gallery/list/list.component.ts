import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() galleryObjectInput: Array<any> = [];
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;

  constructor() { }

  ngOnInit(): void {
    this.chosenImage = this.galleryObjectInput[0];
    this.reload();
  }

  reload() {
    this.imageObjectEmitter.emit(this.chosenImage);
  }

}
