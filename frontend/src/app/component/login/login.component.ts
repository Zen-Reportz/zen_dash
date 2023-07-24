import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallServiceService } from 'src/app/services/call-service.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  is_sso: boolean = true


  constructor(private router: Router, private http: HttpClient,
              private call: CallServiceService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  login_logic(){
    let url = this.call.get_url("/auth/up_login")

    this.http.post(url, {}).subscribe(
      (error) => {
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 10 * 1000,
          data: { message: 'Authentication Failure', status: 'error' },
        });
      }
    )
  }

  sso_logic() {
    let url = this.call.get_url("/auth/login")
    window.location.replace(url)

  }

}
