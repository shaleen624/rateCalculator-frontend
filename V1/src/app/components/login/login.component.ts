import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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

  login(): void {
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.success = 'Login successful';
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid username or password';
      // Handle login error (e.g., display an error message)
    }
  }
}
