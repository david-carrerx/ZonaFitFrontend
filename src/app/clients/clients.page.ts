import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]

})
export class ClientsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
