import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
      username: ['', Validators.required,],
      email: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9A-Za-z.+-]+@[A-Za-z]+.com'),])], 
      password: ['', Validators.required,],   
      confirmPassword: ['', Validators.required,],
    }, { validators: this.samePassword()});

  }

  async signUp(){
    if (this.signUpForm.invalid) return;

    const credential: Credential = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    try{

      await this.authService.signUpWithEmailAndPassword(credential);
      await this.authService.updateUsername(this.signUpForm.value.username);
      this.signUpForm.reset();
      this._router.navigateByUrl('/tabs');
    }
    catch(err){
      console.log(err)
    }
  }

  async signUpWithGoogle(){
    try {
      await this.authService.signInWithGoogleProvider()
    } catch (error) {
      console.log(error)
    }
    this._router.navigateByUrl('/tabs');
  }


  samePassword(): ValidatorFn {
    return (control: AbstractControl): {[ key: string ]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value){
        return {'distinctPasswords': true};
      }
      return null;
    }
  }

  



}
