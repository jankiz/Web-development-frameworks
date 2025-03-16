import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /* 
  router2: Router
  constructor(private router2: Router){
    this.router2 = router2
  }
  */
              // Paraméter adattag
  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("/tasks");
  }
}
