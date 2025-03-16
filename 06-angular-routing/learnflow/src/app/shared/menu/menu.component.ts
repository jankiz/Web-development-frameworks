import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(){
    console.log("construtor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

}
