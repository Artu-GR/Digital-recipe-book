import { AfterContentChecked, AfterContentInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription, filter, last } from 'rxjs';
import { AvatarPhotoService } from '../avatar-photo.service';
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { PhotoService } from '../photo.service';
import { SaveService } from '../save.service';

interface userInfo {
  'username': string | null| undefined,
  'email': string | null| undefined,
  'photoURL': string | null| undefined,
  'emailVerified': boolean | null | undefined,
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})

export class Tab4Component  implements OnInit, OnDestroy, DoCheck {

    currentUserInfo: userInfo = {
      username: '',
      email: '',
      photoURL: '',
      emailVerified: false,
    };

  isAlertOpen = false;
  isModalOpen = false;
  images: any[] =[];
  searchString: string= '';
  lowCounter: number=0;
  highCounter: number=0;
  lastSearch: string='';
  URLSelected: string='';

  private subscription : Subscription | null = null;

  
  constructor(private authService: AuthService,
    private _router: Router,
    private formBuilder : FormBuilder,
    private AvatarService: AvatarPhotoService,
    private PhotoService: PhotoService,
    private saveService: SaveService,
  ) {}

  async LoadSearch(str : string){
    let aux: any;
    if (this.lastSearch === this.searchString
      && this.lastSearch !== ''
    ){
      this.lowCounter += 10;
      this.highCounter += 10;
    }
    else {
      this.lastSearch = this.searchString;
      this.lowCounter = 0;
      this.highCounter = 0;
      this.images = [];
    }

    await this.AvatarService.getImages(str, this.lowCounter, this.highCounter).subscribe((data)=> {
      aux = data;
      this.images = this.images.concat(aux.items);
      console.log(this.images)
    })
    console.log(this.images);
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent){
    this.LoadSearch(this.searchString);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete()
    }, 2000);
  }




  setModalOpen(bool: boolean){
    this.isModalOpen = bool;
    this.URLSelected = '';
  }

  UserNameForm = this.formBuilder.group({
    username: ['', Validators.required]
  })

  PasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, { validators:  this.samePassword()} 
)

  public alertButtonsPassword = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('cancel')
      },
    },
    {
      text: 'Continuar',
      role: 'confirm',
      handler: () => {
        this.updatePassword();
      },
    },
  ];

  public alertButtonsUsername = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('cancel')
      },
    },
    {
      text: 'Continuar',
      role: 'confirm',
      handler: () => {
        this.updateUserName();
      },
    },
  ];

  


  alertButtonsVerified = ['Entendido']

  async ngOnInit() {

    this.subscription = this._router.events.pipe().subscribe(event => {

          this.PasswordForm.reset();
          this.UserNameForm.reset();
          if (this.currentUserInfo.emailVerified){
            this.setAlertOpen(true);
          }
      
    })
  }

  ngDoCheck(): void {
    this.currentUserInfo = this.authService.getUserInfo();
    if (!this.currentUserInfo.photoURL)
      this.currentUserInfo.photoURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRip_-yACYt4Zrk3aQ7A-EgThBZ_5Cf5gaP8xlLUFH13Q&s";
  }

  ngOnDestroy(): void {
    if (this.subscription)
    this.subscription.unsubscribe();
  }

  setAlertOpen(bool : boolean){
    this.isAlertOpen = bool;
  }

  changeURLSelected(str: string){
    this.URLSelected = str;
  }


  async changeProfilePicture(url: string){
    await this.authService.updatePhotoURL(url);
    this.setModalOpen(false);
  }

  async updateUserName(){
    if (this.UserNameForm.value.username)
    await this.authService.updateUsername(this.UserNameForm.value.username)

    this.UserNameForm.reset();
  }

  async updatePassword(){
    if (this.PasswordForm.value.password)
    await this.authService.changePassword(this.PasswordForm.value.password)

    this.PasswordForm.reset();
  }

  async logOut(){
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error)
    }
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

  TakePhoto(){
    this.PhotoService.addNewToGallery().then(async (data) => {
      if (data){
        this.changeProfilePicture(data);
      }


    });
  }

}
