import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { Filesystem, Directory } from '@capacitor/filesystem';

import { Preferences } from '@capacitor/preferences';
//funcion para tomar foto  

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, quality: 100
    });

    return capturedPhoto.webPath;
  }
}
