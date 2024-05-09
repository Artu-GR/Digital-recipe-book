import { Injectable, inject } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
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
}