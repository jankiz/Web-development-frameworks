import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {

  userId: string = '';

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => {
      this.userId = param.userId as string;
    })
  }

}
