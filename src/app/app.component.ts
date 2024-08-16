import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'gamer-finder';
  spans = Array.from(Array(250).keys());
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin().subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.router.url);
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
    });
  }
}
