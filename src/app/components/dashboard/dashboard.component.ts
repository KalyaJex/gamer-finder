import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ProfileIconComponent } from '../svg/profile-icon/profile-icon.component';
import { NotificationIconComponent } from '../svg/notification-icon/notification-icon.component';
import { UsersService } from '../../_services/users.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoaderComponent, ProfileIconComponent, NotificationIconComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  usersService = inject(UsersService);
  users = this.usersService.dummyUsers;
  isMenuOpen = false;

  @ViewChild('menuButton') menuButton?: ElementRef;
  @ViewChild('sidebar') sidebar?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   if (
    //     this.isMenuOpen &&
    //     this.menuButton &&
    //     this.sidebar &&
    //     e.target !== this.menuButton.nativeElement &&
    //     e.target !== this.sidebar.nativeElement
    //   ) {
    //     console.log(e);
    //     this.isMenuOpen = false;
    //     console.log(this.sidebar);

    //     this.renderer.removeClass(this.sidebar.nativeElement, 'open');
    //   }
    // });
  }

  handleMenuOpened() {
    console.log('navigate to profile');
    // this.renderer.addClass(this.sidebar?.nativeElement, 'open');
    // console.log(this.sidebar);

    this.isMenuOpen = true;
  }

  handleMenuClosed(isClosed: boolean) {
    this.isMenuOpen = !isClosed;
  }

  handleNotificationClick() {
    console.log('navigate to notifications');
  }
}
