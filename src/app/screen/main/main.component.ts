import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import Place from 'src/app/interfaces/place.interface';
import { PlacesService } from 'src/app/services/places.service';
import { UserService } from 'src/app/services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  users: Place[] = [];
  modalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private placesService: PlacesService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.users = places;
    })
  }

  openModal(template: TemplateRef<any>) {    
    this.modalRef = this.modalService.show(template);
  }

}
