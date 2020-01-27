import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_service/user.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  // ViewChild is uesed to bring html element like form in JS
  // Also check how submit button is binded to form by using form id in HTML
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  // This decorator is to capture events like user closing the browser
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authservice: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user); // resets form to pristine from dirty and keep the changes
    }, error => {
      this.alertify.error(error);
    });

  }

}
