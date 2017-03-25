import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'login-panel',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: String;
  password: String;

  constructor(private router: Router) { }

  gotoCreatorView(): void {
    this.router.navigate(['/creator']);
  }
}
