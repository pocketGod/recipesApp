import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: any = [];
  constructor(private us: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.us.getUser();
  }

  onSubmit(loginForm: NgForm): void {
    for (let user of this.users) {
      if (
        user.email == loginForm.value.email &&
        user.password == loginForm.value.password
      ) {
        this.router.navigateByUrl('Add-Recipe');
        this.users.setLoggedIn();
        return;
      }
    }
    alert('no');
    loginForm.reset();
  }
}
