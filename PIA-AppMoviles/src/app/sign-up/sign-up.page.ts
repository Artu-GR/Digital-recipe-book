import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validatePassword } from '@firebase/auth';
import { AuthService, Credential } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  signUpForm: FormGroup;

  private authService = inject(AuthService)
  private _router = inject(Router)

  constructor(private formBuilder: FormBuilder) { 
    this.signUpForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9A-Za-z.+-]+@[A-Za-z]+.com'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

  }

  async signUp(){
    if (this.signUpForm.invalid) return;

    const credential: Credential = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    try{
      await this.authService.signUpWithEmailAndPassword(credential);
      this._router.navigateByUrl('/tabs')
    }
    catch(err){
      console.log(err)
    }
  }

  async signUpWithGoogle(){
    try {
      this.authService.signInWithGoogleProvider()
      this._router.navigateByUrl('/tabs')
    } catch (error) {
      console.log(error)
    }
  }

  



}
