import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  userInfo: any;
  dummyIcon: string = "https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg";
  
  constructor(
    private authService: AuthService,
    public userService: UserService,
    
  ){
  }
  ngOnInit(){
    this.userService.userData$.subscribe(data => {
      this.userInfo = data;
    });
  }
  
  onLogout(){
    this.authService.logout();
  }
}
