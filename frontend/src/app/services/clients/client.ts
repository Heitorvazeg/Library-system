import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  name: string;
  cpf: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private api = 'http://backend:3000/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api);
  }

  createClient(client: Client) {
    return this.http.post(this.api, client);
  }

  uptadeClient(client: Partial<Client>, cpf: string) {
    return this.http.patch(`${this.api}/${cpf}`, client);
  }

  deleteClient(cpf: string) {
    return this.http.delete(`${this.api}/${cpf}`);
  }
}
