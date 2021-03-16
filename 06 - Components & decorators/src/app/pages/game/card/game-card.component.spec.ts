import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
