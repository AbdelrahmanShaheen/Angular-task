import { Injectable } from '@angular/core';
import { UserLoginModel } from '../../models/userLogin.model';
import { UserSignupModel } from '../../models/userSignup.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user !:UserSignupModel;
  
  constructor(private router: Router) { }
  
  login(loginForm: FormGroup<any>) {
    if(loginForm.valid){
        this.user = {
          email:loginForm.value.email,
          password:loginForm.value.password,
          username:loginForm.value.username
        };
      const storedUsers: UserSignupModel[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((storedUser: UserSignupModel) => {
        return storedUser.email === this.user.email && storedUser.password === this.user.password;
      });
      if(user) this.user.username = user.username;
      if(this.isUserExists()){
        localStorage.setItem('currentUser' ,JSON.stringify(this.user));
        this.router.navigate(['/todo'])
      }
    }
  }
  
  isUserExists(): boolean{
    const storedUsers: UserSignupModel[] = JSON.parse(localStorage.getItem('users') || '[]');
    return storedUsers.some((storedUser: UserSignupModel) => {
      return storedUser.email === this.user.email && storedUser.password === this.user.password;
    });
  }
}
