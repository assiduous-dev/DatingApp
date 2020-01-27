import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//     'Access-Control-Allow-Origin': '*'
//   })
// };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/'; // environment.apiUrl;

constructor(private httpClient: HttpClient) {}

getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'users');
  }

getUser(id): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'users/' + id);
  }

updateUser(id: number, user: User) {
  return this.httpClient.put(this.baseUrl + 'users/' + id, user);
}
}
