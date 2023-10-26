import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loggedIn = false;
  private suscripcion: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.loggedIn = this.userService.getLoggedIn();
    this.suscripcion = this.userService.checkLoggedIn().subscribe(nuevoValor => {
      this.loggedIn = nuevoValor;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  logout() {
    this.userService.logout()
      .then(() => {
        this.userService.setLoggedOut();
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
