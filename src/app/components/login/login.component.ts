import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
     private router: Router,
     private userService: UserService,
     private toastrService: ToastrService
    ) { 
      if(localStorage.getItem('isLoggedIn') === 'true') {
        this.router.navigate(['/']);
      }
    }
    
    login(): void {
    // Call AuthService to authenticate user
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        
        // Redirect to home page upon successful login
        for (let user of response) {
          if(user['email'] == this.email && user['password'] == this.password) {
           this.userService.setUser(user);
           this.router.navigate(['/']);
           this.toastrService.success("LoggedIn Successfully!");
           return;
         }
         else{
           this.toastrService.error("Invalid Credentials");
           return;
         }
        } 
        this.toastrService.error("Invalid Credentials");
      },
      (error: any) => {
        console.error('Login failed:', error);
      }
    );
  }
}
