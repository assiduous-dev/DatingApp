import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();

  constructor(private authservice: AuthService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {
      this.authservice.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
  
}
