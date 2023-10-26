import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Plane from 'src/app/interfaces/plane.interface';
import { PlanesService } from 'src/app/services/planes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {
  formulario: FormGroup;
  planes: Plane[] = [];
  modalRef?: BsModalRef;
  plane: Plane = {
    origen: '',
    destino: '',
    fechaSalida: '',
    horaLlegada: '',
    horaSalida: '',
    observaciones: ''
  };

  constructor(
    private planesService: PlanesService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
    this.formulario = new FormGroup({
      id: new FormControl(),
      origen: new FormControl(),
      destino: new FormControl(),
      fechaSalida: new FormControl(),
      horaSalida: new FormControl(),
      horaLlegada: new FormControl(),
      observaciones: new FormControl()
    })
  }

  ngOnInit(): void {
    this.planesService.getPlanes().subscribe(planes => {
      this.planes = planes;
    })
  }

  openModal(template: TemplateRef<any>, plane?: Plane) {    
    if(plane != null) {
      this.formulario.patchValue({
        id: plane.id,
        origen: plane.origen,
        destino: plane.destino,
        fechaSalida: plane.fechaSalida,
        horaSalida: plane.horaSalida,
        horaLlegada: plane.horaLlegada,
        observaciones: plane.observaciones
      })
    } else {
      this.formulario.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  async onSubmit() {debugger;
    console.log(this.formulario.value)
    console.log(this.planes);
    const index: number = this.planes.findIndex((plane: Plane) => plane.id === this.formulario.value.id);
    if (index !== -1) {
      const response = await this.planesService.updatePlane(this.formulario.value);console.log(response);
    } else {
      this.formulario.value.id = this.planes.length;
      const response = await this.planesService.addPlane(this.formulario.value);console.log(response);
    }
    this.modalRef?.hide();
  }

  async deleteUser(index: number) {
    if(confirm("Are you sure you want to delete this user?")) { 
      const plane: Plane = this.planes[index];
  
      if(plane != null) {
        const response = await this.planesService.deletePlace(plane);console.log(response);
        //this.planes.splice(index, 1);
      }
      else {
        alert("User not found");
      }
    }
  }

}
