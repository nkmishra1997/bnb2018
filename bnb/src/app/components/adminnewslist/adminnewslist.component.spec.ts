import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnewslistComponent } from './adminnewslist.component';

describe('AdminnewslistComponent', () => {
  let component: AdminnewslistComponent;
  let fixture: ComponentFixture<AdminnewslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnewslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnewslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
