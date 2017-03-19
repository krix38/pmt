import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'login-panel',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: String;
  password: String;
}
