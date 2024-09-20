import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import User from '../../DTO/userDTO';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private refreshRequired = new Subject<void>();
  private totalUser:Number | undefined;

  //getter method for requiredrefresh
  get RequiredRefresh(){
    return this.refreshRequired;
  }

  //setter method for totaluser
  set SetTotalUser(totalUser:Number){
    this.totalUser = totalUser;
  }

  //getter method for totaluser
  get GetTotalUser(){
    return this.totalUser;
  }

  
  //add user service
  addUser(user:User):Observable<any>{
    //console.log(user);
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'});
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // });
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem('token'),
    });
  return this.http.post("http://localhost:8080/api/users/",user,{headers}).pipe(
    tap(()=>this.RequiredRefresh.next())
  );
  }
  //fatch all user service
  allUser():Observable<User[]>{
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem('token'),
      //"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk1NTQ3MzV9.9XaZhH4bjgPc-Na9shZHkLx1RDHfalBD4Rx6Ow2P6mM",
    });
    return this.http.get<User[]>("http://localhost:8080/api/users/",{headers});
  }

  //update user service
  updateUser(user:User):Observable<any>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // });
    // console.log(user);
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem('token'),
      //"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk1NTQ3MzV9.9XaZhH4bjgPc-Na9shZHkLx1RDHfalBD4Rx6Ow2P6mM",
    });
    return this.http.patch('http://localhost:8080/api/users/'+user.id,user,{headers}).pipe(
      tap(()=>this.RequiredRefresh.next())
    );
  }
  //delete user service
  deleteUser(id:any):Observable<any>{
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem('token'),
      //"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk1NTQ3MzV9.9XaZhH4bjgPc-Na9shZHkLx1RDHfalBD4Rx6Ow2P6mM",
    });
    return this.http.delete("http://localhost:8080/api/users/"+id,{headers}).pipe(
      tap(()=>this.RequiredRefresh.next())
    );
  }
}
