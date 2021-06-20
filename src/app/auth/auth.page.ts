import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService,AuthResponseData} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}


  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {


        if(this.isLogin){
          this.authService.login(email,password)
          .then( (res) => {
            loadingEl.dismiss();
            this.onLoginRedirect();
          }).catch(err => console.log('err',err.message));
        } else {

        }
        /*loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email,password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log("subscribiendo... AUTHENTICATE FUNCTION- AUTH.PAGE");
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/client-nutri/tabs');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'No pudimos registrarte. Por favor, intentelo de nuevo';
            if (code === 'EMAIL_EXISTS') {
              message = 'Esta dirección de correo electrónico ya existe!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Dirección de correo electrónico no encontrada.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Contraseña incorrecta.';
            }
            this.showAlert(message);
          }
        );
      }*/
    }
    );
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.authenticate(email,password);
    form.reset();
  }
  onLoginRedirect(): void {
    this.router.navigateByUrl('/client-nutri/tabs');
  }
  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
