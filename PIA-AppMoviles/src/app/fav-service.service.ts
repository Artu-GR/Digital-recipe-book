import { EventEmitter, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { deleteDoc, getFirestore } from '@angular/fire/firestore';
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
  public favoritesChanged: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  async addFavorite(recipe: any){
    await addDoc(CollectionData, {
      RecipeID: recipe,
      UserID: user?.uid
    });
    this.favoritesChanged.emit();
  }

  async deleteFavorite(recipeID: string){
    const q = query(CollectionData, where("UserID", "==", user?.uid), where("RecipeID","==",recipeID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "RecetasFavoritas", docSnapshot.id));
    });
    this.favoritesChanged.emit();
  }

  async getFavorites(){
    const q = query(CollectionData, where("UserID", "==", user?.uid));
    return await getDocs(q);
  }
}
