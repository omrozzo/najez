import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appauth } from './appauth';

describe('Appauth', () => {
  let component: Appauth;
  let fixture: ComponentFixture<Appauth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appauth],
    }).compileComponents();

    fixture = TestBed.createComponent(Appauth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
