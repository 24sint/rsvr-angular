import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  resourceUrl: string = "https://rsvrspringboot.herokuapp.com/users/";
  //resourceUrl: string = "http://localhost:8080/users/";
  
  users: User[];
  loggedInUserId: string;
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
  constructor(private http: HttpClient, private eventService: EventService) { }

  getUser(id: number){
    return this.http.get(this.resourceUrl + id, this.httpOptions);
  }
  getUsers(): void {
    this.http.get<User[]>(this.resourceUrl).subscribe((users: User[])=>{
      this.users = users;
    });
  }
  postUser(user: User){
    return this.http.post(this.resourceUrl, user, this.httpOptions);
  }
  putUser(user: User){
    user.events = null;
    return this.http.put(this.resourceUrl + user.id, user, this.httpOptions);
  }
  deleteUser(id: number): void{
    this.http.delete(this.resourceUrl + id).subscribe(()=>{
      this.getUsers();
    });
  }
}
