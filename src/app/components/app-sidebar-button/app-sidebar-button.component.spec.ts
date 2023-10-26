import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarButtonComponent } from './app-sidebar-button.component';

describe('AppSidebarButtonComponent', () => {
  let component: AppSidebarButtonComponent;
  let fixture: ComponentFixture<AppSidebarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSidebarButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidebarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
