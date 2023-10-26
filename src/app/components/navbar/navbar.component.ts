import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private sidebarVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];

    if (!this.sidebarVisible) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
      console.log('making sidebar visible...');
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

}
