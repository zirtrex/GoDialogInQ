import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProduccionComponent } from './crear-produccion.component';

describe('CrearProduccionComponent', () => {
  let component: CrearProduccionComponent;
  let fixture: ComponentFixture<CrearProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
