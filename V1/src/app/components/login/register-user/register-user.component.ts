import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  username: string = "";
  password: string = "";
  error: string = "";
  success: string = "";
  baseUrl = BASE_URL;

  constructor(private authService: AuthService,
     private router: Router) { }
     
  registerUser() {
    const user = { username: this.username, password: this.password };
   
      this.authService.registerUser(user).subscribe(
        (response) => {
          console.log(response.message);
          this.success = 'Registration successful';
        },
        (error) => {
          console.error(error);
          this.error = 'Invalid username or password';
        }
      );
  }

}
