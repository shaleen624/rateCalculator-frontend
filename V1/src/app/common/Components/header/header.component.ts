import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuCollapsed = true;
  isAuthenticated: boolean= false;

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  logout() {
    this.authService.logout();
    // Redirect to the login page or desired page
    this.router.navigate(['/dashboard']);
  }

}
