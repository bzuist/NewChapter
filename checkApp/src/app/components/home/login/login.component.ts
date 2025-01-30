import { Credential } from 'src/app/models/auth/Credential';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential: Credential;
  errorAuth: boolean;
  apiUrl = 'http://localhost:3000/users';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.clearLoginData();
    this.credential = new Credential();
    this.authService.logoutWithoutRedirect();
  }

  login() {
    console.log(this.credential)
    this.authService.authenticate(this.credential, () => {
      this.router.navigate(['/readComponent/1']);
      this.errorAuth = true;
    });
  }

  goToRegistration (){
    this.router.navigate(['/registration']);
  }
}
