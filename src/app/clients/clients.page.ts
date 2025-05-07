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
  clients: any[] = [];

  constructor(private http: HttpClient) { }



  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/clients/clients')
      .subscribe({
        next: (data) => this.clients = data,
        error: (e) => console.log(e)
      });
  }

  isClientActive(endDate: string | Date): boolean {
    const today = new Date();
    return new Date(endDate) >= today;
  }

}
