import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Plane from '../interfaces/plane.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private firestore: Firestore) { }

  addPlane(plane: Plane) {
    const placeRef = collection(this.firestore, 'vuelos');
    return addDoc(placeRef, plane);
  }

  getPlanes(): Observable<Plane[]> {
    const placeRef = collection(this.firestore, 'vuelos');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Plane[]>;
  }

  updatePlane(newData: Plane) {
    const placeDocRef = doc(this.firestore, `vuelos/${newData.id}`);
    return updateDoc(placeDocRef, {origen: newData.origen, destino: newData.destino, horaSalida: newData.horaSalida, horaLlegada: newData.horaLlegada, observaciones: newData.observaciones});
    /*collection(this.firestore, 'planes').doc(registrationId).update(newData)
      .then(() => {
        console.log('Registration updated successfully.');
      })
      .catch(error => {
        console.error('Error updating registration:', error);
      });*/
  }

  deletePlace(plane: Plane) {
    const placeDocRef = doc(this.firestore, `vuelos/${plane.id}`);
    return deleteDoc(placeDocRef);
  }

}