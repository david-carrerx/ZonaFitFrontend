import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({ message: "Iniciando sesión"});
    await loading.present();

    this.http.post('http://localhost:3000/api/auth/login', {email : this.email, password: this.password})
      .subscribe({
        next: async(res: any) => {
          await loading.dismiss();
          const alert = await this.alertCtrl.create({ message: "Inicio de sesión exitoso", buttons: ['OK']});
          await alert.present();
          this.router.navigate(['/home']);
        },
        error: async(e) => {
          await loading.dismiss();
          const alert = await this.alertCtrl.create({ message: "Error en las credenciales", buttons: ['OK']});
          await alert.present();
        }
      });
  }
}
