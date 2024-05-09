import { Injectable, inject } from "@angular/core";
import { Auth, authState, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
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
    private _router = inject(Router);

    signUpWithEmailAndPassword(credential: Credential) : Promise<UserCredential>{
        return createUserWithEmailAndPassword(
            this.auth,
            credential.email,
            credential.password
        )
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