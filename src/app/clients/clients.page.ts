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
  filteredClients: any[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'todos';
  showModal = false;
  selectedClient: any = null;
  selectedPlan: string = '';



  constructor(private http: HttpClient) { }



  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/clients/clients')
      .subscribe({
        next: (data) => {
          this.clients = data;
          this.filteredClients = data;
        },
        error: (err) => console.error(err)
      });
  }

  filterClients() {
    const term = this.searchTerm.toLowerCase();
  
    this.filteredClients = this.clients.filter(client => {
      const matchesName = client.name.toLowerCase().includes(term);
  
      if (this.selectedFilter === 'activo') {
        return matchesName && this.isClientActive(client.end_date) && !this.isExpiringSoon(client.end_date);
      } else if (this.selectedFilter === 'inactivo') {
        return matchesName && !this.isClientActive(client.end_date);
      } else if (this.selectedFilter === 'pronto') {
        return matchesName && this.isExpiringSoon(client.end_date);
      } else if (this.selectedFilter === 'mes') {
        const end = new Date(client.end_date);
        const today = new Date();
        return (
          matchesName &&
          end.getMonth() === today.getMonth() &&
          end.getFullYear() === today.getFullYear()
        );
      } else {
        return matchesName; // todos
      }
    });
  }
  

  isExpiringSoon(endDate: string | Date): boolean {
    const today = new Date();
    const end = new Date(endDate);
    const diffInMs = end.getTime() - today.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays > 0 && diffInDays <= 3;
  }

  isClientActive(endDate: string | Date): boolean {
    const today = new Date();
    return new Date(endDate) >= today;
  }

  openClientModal(client: any) {
    this.selectedClient = client;
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
  }
  
  updateClientPlan() {
    if (!this.selectedClient || !this.selectedPlan) return;
  
    const today = new Date();
    let endDate = new Date(today);
  
    switch (this.selectedPlan) {
      case 'mensual':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'semanal':
        endDate.setDate(endDate.getDate() + 7);
        break;
      case 'visita':
        endDate.setDate(endDate.getDate() + 1);
        break;
    }
  
    const body = {
      start_date: today.toISOString(),
      end_date: endDate.toISOString(),
      package: this.selectedPlan
    };
  
    this.http.put(`http://localhost:3000/api/clients/update-client/${this.selectedClient._id}`, body)
      .subscribe({
        next: (res: any) => {
          console.log('Cliente actualizado:', res);
  
          const updatedClient = res.client;
          const index = this.clients.findIndex(c => c._id === updatedClient._id);
  
          if (index !== -1) {
            this.clients[index] = updatedClient;
  
            const filterIndex = this.filteredClients.findIndex(c => c._id === updatedClient._id);
            if (filterIndex !== -1) {
              this.filteredClients[filterIndex] = updatedClient;
            }
          }
  
          this.filterClients();  
          this.closeModal();
        },
        error: (err) => {
          console.error('Error actualizando cliente:', err);
        }
      });
  }
}
