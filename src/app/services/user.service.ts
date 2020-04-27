import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  resourceUrl: string = "http://localhost:8080/users/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  usersChanged: EventEmitter<Object> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getUser(){
    
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.resourceUrl);
  }
  postUser(){

  }
  putUser(){

  }
  deleteUser(id: number): void{
    this.http.delete(this.resourceUrl + id).subscribe(()=>{

      this.getUsers().subscribe((userResList: User[])=>{
        this.usersChanged.emit(userResList);
      })
      
    });
  }
}
