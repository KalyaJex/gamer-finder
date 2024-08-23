import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ProfileIconComponent } from '../svg/profile-icon/profile-icon.component';
import { NotificationIconComponent } from '../svg/notification-icon/notification-icon.component';
import { UsersService } from '../../_services/users.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LoaderComponent,
    ProfileIconComponent,
    NotificationIconComponent,
    SidebarComponent,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  usersService = inject(UsersService);
  users = this.usersService.dummyUsers;
  isMenuOpen = false;
  hasNewNotification = false;

  @ViewChild('menuButton') menuButton?: ElementRef;
  @ViewChild('sidebar') sidebar?: ElementRef;

  constructor(private renderer: Renderer2) {}

  handleMenuOpened() {
    this.isMenuOpen = true;
  }

  handleMenuClosed(isClosed: boolean) {
    this.isMenuOpen = !isClosed;
  }

  handleNotificationClick() {
    console.log('navigate to notifications');
  }
}
