import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
} from '@angular/core';
import { ProfileIconComponent } from '../svg/profile-icon/profile-icon.component';
import { UserIconComponent } from '../svg/user-icon/user-icon.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ProfileIconComponent, UserIconComponent, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isOpen = input.required<boolean>();
  oncloseMenu = output<boolean>();
  userProfilePicture = 'dummy-profile-pic.png';

  // fetch user profile

  @HostListener('document:click', ['$event']) clickOut(event: Event) {
    if (this.isOpen() && !this.eRef.nativeElement.contains(event.target)) {
      console.log('test');
      this.oncloseMenu.emit(true);
    }
  }

  constructor(
    private eRef: ElementRef,
    private router: Router,
  ) {}

  onClickProfile() {
    this.router.navigate(['profile']);
  }
}
