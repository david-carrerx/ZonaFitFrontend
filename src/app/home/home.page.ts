import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { AddClientModalComponent } from '../components/add-client-modal/add-client-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]

})
export class HomePage {

  currentDate: string = new Date().toISOString();
  showAddClientModal = false;
  newClient = {
    name: '',
    start_date: '',
    end_date: '',
    package: ''
  };


  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  openAddClientModal() {
    this.showAddClientModal = true;
  }

  closeAddClientModal() {
    this.showAddClientModal = false;
  }
  

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    console.log('Fecha seleccionada:', selectedDate);
  }
  
  saveNewClient() {
    if (this.newClient.name && this.newClient.start_date && this.newClient.end_date && this.newClient.package) {
      // Prepara los datos
      const clientData = {
        name: this.newClient.name,
        start_date: this.newClient.start_date,
        end_date: this.newClient.end_date,
        package: this.newClient.package
      };
  
      this.http.post('http://localhost:3000/api/clients/add-client', clientData).subscribe({
        next: (res) => {
          console.log('Cliente guardado correctamente:', res);
          this.closeAddClientModal();
          this.newClient = { name: '', start_date: '', end_date: '', package: '' };
        },
        error: (err) => {
          console.error('Error al guardar cliente:', err);
          alert('Ocurrió un error al guardar el cliente.');
        }
      });
  
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
  

}
