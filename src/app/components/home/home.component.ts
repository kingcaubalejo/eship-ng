import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    console.log(this.user);
  }

  ngOnInit(): void {}

  onLogout() {
    console.log('Logout button is called');
    this.authService.logout();
  }
}
