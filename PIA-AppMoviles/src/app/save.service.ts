import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getStorage, ref, uploadBytes, uploadString } from '@angular/fire/storage';





const storage = getStorage();

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }



  storageRef = ref(storage, 'images');


}
