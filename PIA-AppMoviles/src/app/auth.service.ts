import { Injectable, inject } from "@angular/core";
import { Auth, authState, getAuth, GoogleAuthProvider, signInWithPopup, updatePassword, updateProfile, user } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

export interface Credential {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth)

    readonly authState$ = authState(this.auth)

    getUserInfo() {
        return {
            'username': this.auth.currentUser?.displayName,
            'email': this.auth.currentUser?.email,
            'photoURL': this.auth.currentUser?.photoURL,
            'emailVerified': this.auth.currentUser?.emailVerified,
        }
        
    }

    signUpWithEmailAndPassword(credential: Credential) : Promise<UserCredential>{
        return createUserWithEmailAndPassword(
            this.auth,
            credential.email,
            credential.password
        )
    }

    updateUsername(username: string) {
        console.log('yes')
        if (this.auth.currentUser !== null){
                updateProfile(this.auth.currentUser, {
                    displayName: username
                }).then( () => {
                    console.log(this.auth.currentUser?.displayName);

                } ).catch((err) => {
                    console.log(err);
                })
        }

    }

    changePassword(password: string){
        if (this.auth.currentUser !== null)
        updatePassword(this.auth.currentUser, password).then(() => {
            console.log('Contraseña cambiada');
        }).catch((error) => {
            console.log(error);
        });
    }

    logInWithEmailAndPassword(credential: Credential){
        return signInWithEmailAndPassword(
            this.auth,
            credential.email,
            credential.password
        )
    }

    logOut() {
        return this.auth.signOut();
    }



    async signInWithGoogleProvider(): Promise <UserCredential>{
        const provider = new GoogleAuthProvider()

        try {
            const result = await signInWithPopup(this.auth,provider)
            return result;
        } catch (error:any) {
            return error;
        }
    }


}