import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userArr: any[] = [{ email: 'seza@gmail.com', password: '123456' }, { email: 'aviv@gmail.com', password: '123456' }];
  isLoggedin: boolean = false;
  constructor() {}

  getUser(): any {
    return this.userArr;
  }

  setloggedIn(): void {
    this.isLoggedin = true;
  }

  getloggedIn(): boolean {
    return this.isLoggedin;
  }
}
