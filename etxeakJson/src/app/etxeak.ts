import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etxea } from './etxea';

@Injectable({
  providedIn: 'root',
})
export class Etxeak {
  private http = inject(HttpClient);
  private readonly URL = 'http://localhost:3000/etxeak';

  guztiak(): Observable<Etxea[]> {
    return this.http.get<Etxea[]>(this.URL);
  }

  bat(id: string): Observable<Etxea> {
    return this.http.get<Etxea>(`${this.URL}/${id}`);
  }
}
