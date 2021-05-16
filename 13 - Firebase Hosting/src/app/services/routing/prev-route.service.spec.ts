import { TestBed } from '@angular/core/testing';

import { PrevRouteService } from './prev-route.service';
import { RouterModule } from '@angular/router';

describe('PrevRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([])]
  }));

  it('should be created', () => {
    const service: PrevRouteService = TestBed.inject(PrevRouteService);
    expect(service).toBeTruthy();
  });
});
