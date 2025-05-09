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

  constructor(private modalCtrl: ModalController) {}

  async openAddClientModal() {
    const modal = await this.modalCtrl.create({
      component: AddClientModalComponent
    });
    await modal.present();
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    console.log('Fecha seleccionada:', selectedDate);
  }
  

}
