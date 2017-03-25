import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'login-panel',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: String;
  password: String;

  constructor(public authService: AuthService, private router: Router) { }

  gotoCreatorView(): void {
    this.authService.login(this.login, this.password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/creator';
        this.router.navigate([redirect]);
      }
    });
  }
}
