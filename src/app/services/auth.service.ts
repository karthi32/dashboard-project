// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient,
    private router: Router  
  ) { }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


 login(email: string, password: string): Observable<any> {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}
