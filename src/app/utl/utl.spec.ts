import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Utl } from './utl';

describe('Utl', () => {
  let component: Utl;
  let fixture: ComponentFixture<Utl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Utl],
    }).compileComponents();

    fixture = TestBed.createComponent(Utl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
