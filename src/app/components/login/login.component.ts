import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private activatedRoute = inject(ActivatedRoute);
  signinForm: FormGroup;
  signupForm: FormGroup;
  isSignupShown = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signinForm = this.formBuilder.group({
      signinEmail: ['', Validators.required],
      signinPassword: ['', Validators.required],
    });

    this.signupForm = this.formBuilder.group({
      signupUsername: ['', [Validators.required]],
      signupEmail: ['', [Validators.required, Validators.email]],
      signupPassword: ['', [Validators.required]],
      signupConfirmPassword: ['', Validators.required],
    });
  }

  onClickSignup(e: MouseEvent) {
    e.preventDefault();
    this.isSignupShown.set(true);
  }

  onClickBack(e: MouseEvent) {
    e.preventDefault();
    this.isSignupShown.set(false);
  }

  onSignin() {
    console.log(this.signinForm.value);
    this.authService
      .login(
        this.signinForm.value.signinEmail,
        this.signinForm.value.signinPassword,
      )
      .subscribe(() => {
        console.log('test');
        this.router.navigate(['./dashboard'], {
          relativeTo: this.activatedRoute,
        });
      });
  }

  onSignup() {
    console.log(this.signupForm.value);
    console.log(this.signupForm.get('signupUsername')?.invalid);
  }
}
