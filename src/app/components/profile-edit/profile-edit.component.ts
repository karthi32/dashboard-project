import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.userService.userData$.subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.initForm();
    this.router.events.subscribe(event => {
      // Check if it's a NavigationEnd event
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      username: [this.user.username, Validators.required],
      phone: [this.user.phone, Validators.required],
      gender: [this.user.gender, Validators.required],
      country: [this.user.country, Validators.required],
      city: [this.user.city, Validators.required],
      address: [this.user.address, Validators.required],
      avatarLink: [this.user.avatarLink, Validators.required],
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.profileForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        country: this.user.country,
        city: this.user.city,
        address: this.user.address,
        avatarLink: this.user.avatarLink
      });
    }
  }

  saveChanges() {
    this.userService.updateUserProfile({...this.user, ...this.profileForm.value}).subscribe(response =>{
      this.userService.setUser({...this.user, ...this.profileForm.value});
      this.toastrService.success("User details updated successfully!");
    })
    this.router.navigate(['/']);
  }

  onCancel(){
    this.router.navigate(['/']);
  }
}
