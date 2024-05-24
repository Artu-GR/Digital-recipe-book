import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, Credential } from '../auth.service';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  logInForm: FormGroup
  private authService= inject(AuthService);
  private _router = inject(Router);

  constructor(private formBuilder: FormBuilder) { 
    this.logInForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9A-Za-z.+-]+@[A-Za-z]+.com'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    

  }

  ngOnInit() {
  }


  async logIn(){

    const credential: Credential = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password
    }
    this.logInForm.reset();

    try{
      await this.authService.logInWithEmailAndPassword(
        credential
      )
      this._router.navigateByUrl('/tabs')
    }
    catch(err){
      console.log(err)
    }
  }

  async logInWithGoogle(){
    try {
      await this.authService.signInWithGoogleProvider();
    } catch (error) {
      console.log(error)
    }
    this._router.navigateByUrl('/tabs');
  }

}
