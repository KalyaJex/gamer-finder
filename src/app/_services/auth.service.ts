import {
  HttpClient,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import moment from 'moment';

interface AuthResult {
  token: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  public isRefreshing = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );
  private api = 'https://localhost/gamer-finder-api/';
  private loginUrl = this.api + 'auth/login';
  private refreshUrl = this.api + 'auth/refresh-token';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {}

  login(email: string, password: string): Observable<AuthResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.httpClient
      .post<AuthResult>(this.loginUrl, body, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay(),
      );
  }

  private setSession(authResult: AuthResult) {
    const expiresAt = moment(authResult.expiresAt);

    localStorage.setItem('jwtToken', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt * 1000);
    }
    return moment();
  }

  private refreshToken(): Observable<AuthResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .post<AuthResult>(this.refreshUrl, {}, { headers, withCredentials: true })
      .pipe(
        tap((res) => {
          if (res && res.token) {
            this.setSession(res);
          }
        }),
      );
  }

  public addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public autoLogin(): Observable<boolean> {
    return new Observable((observer) => {
      if (this.isLoggedIn()) {
        observer.next(true);
        observer.complete();
      } else {
        this.refreshToken().subscribe({
          next: () => {
            observer.next(true);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });
      }
    });
  }

  public handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next(this.addToken(req, token));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((jwt) => next(this.addToken(req, jwt))),
      );
    }
  }
}
