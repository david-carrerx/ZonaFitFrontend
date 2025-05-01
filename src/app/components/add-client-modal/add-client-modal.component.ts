import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ]

})
export class AddClientModalComponent {

  client = {
    name: '',
    start_date: '',
    end_date: '',
    package: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient
  ) { }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  saveClient() {
    this.http.post('http://localhost:3000/api/clients/add-client', this.client)
      .subscribe({
        next: () => {
          alert('Cliente agregado correctamente');
          this.dismiss();
        },
        error: e => {
          console.log(e);
          alert('Error al agregar cliente');
        }
      });
  }
}
