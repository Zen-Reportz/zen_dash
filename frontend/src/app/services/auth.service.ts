import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookie: CookieService) { }

  not_logged() {
    return this.cookie.get("auth_token") === ''
  }

  removed_cookie(){
    this.cookie.delete('auth_token')
  }
}
