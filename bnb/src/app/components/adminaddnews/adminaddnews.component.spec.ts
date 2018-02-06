import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddnewsComponent } from './adminaddnews.component';

describe('AdminaddnewsComponent', () => {
  let component: AdminaddnewsComponent;
  let fixture: ComponentFixture<AdminaddnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
