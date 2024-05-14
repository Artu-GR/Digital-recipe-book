import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { collectionData, getFirestore } from '@angular/fire/firestore';
import { collection, addDoc, doc, where, getDocs, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3QsxNUwK-gy1f15wK8HtQHMkWbMcoMo0",
  authDomain: "pia-catalogoderecetas.firebaseapp.com",
  projectId: "pia-catalogoderecetas",
  storageBucket: "pia-catalogoderecetas.appspot.com",
  messagingSenderId: "94724331768",
  appId: "1:94724331768:web:262d5b7cbda2879dd3430d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
const user = auth.currentUser;
const CollectionData = collection(db, "RecetasFavoritas");

@Injectable({
  providedIn: 'root'
})

export class FavServiceService {

  constructor() {
    this.getFavorites();
  }

  public favorites: any[] = [];

  async addFavorite(recipe: string){
    await addDoc(CollectionData, {
      RecipeID: recipe,
      UserID: user?.uid
    });
  }

  async deleteFavorite(recipeID: string){
    const q = query(CollectionData, where("UserID", "==", user?.uid), where("RecipeID","==",recipeID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data)
    })
  }

  async getFavorites(){
    const q = query(CollectionData, where("UserID", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.favorites.push(doc.data);
    });
  }


}
