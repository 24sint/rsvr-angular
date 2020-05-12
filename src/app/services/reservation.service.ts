import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  resourceUrl: string = "https://rsvrspringboot.herokuapp.com/reservations/";
  //resourceUrl: string = "http://localhost:8080/reservations/";
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient, private userService: UserService, private eventService: EventService) {}

  postReservation(eventId: string){
    this.http.post(this.resourceUrl + "?userId=" + this.userService.loggedInUserId + "&eventId=" + eventId, null, this.httpOptions)
      .subscribe(()=>{
        console.log("Reserved");
        this.eventService.getEvents();
      });
  }

  deleteReservation(reservationId: number){
    this.http.delete(this.resourceUrl + reservationId)
      .subscribe(()=>{
        console.log("Reservation Canceled");
        this.eventService.getEvents();
      });
  }
}
