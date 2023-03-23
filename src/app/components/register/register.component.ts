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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //Form variables
  registerForm: any = FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.authService
        .register(this.registerForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
            Swal.fire('Hi', 'User is successfully registered!', 'success');
            this.onClearForm();
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>',
            });
          },
        });
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      birthdate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onClearForm() {
    this.registerForm.reset();
  }
}
