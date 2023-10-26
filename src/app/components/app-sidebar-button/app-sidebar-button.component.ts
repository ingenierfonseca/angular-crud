import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './app-sidebar-button.component.html',
  styleUrls: ['./app-sidebar-button.component.css']
})
export class AppSidebarButtonComponent implements OnInit {
  loggedIn = true;
  constructor() { }

  ngOnInit(): void {
  }

}
