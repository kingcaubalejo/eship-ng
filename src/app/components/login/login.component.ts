import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Form variables
  registerForm: any = FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      console.log(this.registerForm.value);
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
          next: () => {
            Swal.fire('Hi', 'Login Successfully!', 'success');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: JSON.stringify(error.error.error),
              footer: '<a href="">Why do I have this issue?</a>',
            });
            // this.onClearForm();
          },
        });
    }
  }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onClearForm() {
    this.registerForm.reset();
  }
}
