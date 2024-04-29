import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user: any = {};
  editMode: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.initForm();
  }

  initForm() {
    this.userService.userData$.subscribe(userData =>{
      this.user = userData;
    })
  }

  toggleEditMode() {
    this.router.navigate(['/profile-edit']);
  }
}
