import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();
  private apiUrl = 'http://localhost:3000/users';

constructor(private http: HttpClient){}

  setUser(user: any): void {
    this.userDataSubject.next(user);
  }

  getUserProfile(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }

  updateUserProfile(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.id}`,{...user});
  }
  
}
