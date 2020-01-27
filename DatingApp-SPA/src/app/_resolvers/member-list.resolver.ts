import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// We are building these resolvers so that data is loaded first before the route becomes active
// Therefore we can get rid off null propogation or elvis operator ?.
@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
       return this.userService.getUsers().pipe(
           catchError(error => {
               this.alertify.error('Problem retrieving data');
               this.router.navigate(['/home']);
               return of(null);
           })
       );
    }
}
