import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router,private http:HttpClient) { }

  setToken(res:any):void{
    localStorage.setItem('token',res.token);
    localStorage.setItem('name',res.fullName);
    localStorage.setItem('userName',res.userName);
    localStorage.setItem('role',res.role);
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

  login(login : any): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/login",login).pipe(
      tap((res:any)=>this.setToken(res))
    );
  }
  isLoggedIn():boolean {
    return this.getToken() !== null;
  }
  isAdmin():boolean{
    return localStorage.getItem('role') === 'Admin';
  }
  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
