import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarPhotoService {

  constructor(private http : HttpClient) { }


  getImages(str: string, low:number, high:number){
    return this.http.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCOTYPZmoXYKwT44EgeLhmnYKCtLtqxiPQ&cx=37cf384e99da44b9e&searchType=image&lowRange=${low}&highRange=${high}&q=` + str)
  }
}
