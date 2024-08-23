import { Component } from '@angular/core';
import { BackArrowIconComponent } from '../svg/back-arrow-icon/back-arrow-icon.component';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopBarComponent } from "../_shared/top-bar/top-bar.component";


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [BackArrowIconComponent, MatIconModule, TopBarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  username = 'Username';
  userProfilePicture = 'dummy-profile-pic.png';
  userBio = 'Im a user bla bla bla...';

  testMenu = [
    {
      label: 'test 1',
      fn: () => console.log('test menu 1'),
    },
    {
      label: 'test 2',
      fn: () => console.log('test menu 2'),
    },
  ];

  constructor(
    private router: Router,
    private location: Location,
  ) {}

  onClickNavigateBack() {
    this.router.navigate(['dashboard']);
  }

  onClickNavigateEditProfile() {
    this.router.navigate(['edit-profile']);
  }
}
