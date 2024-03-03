import { Injectable } from '@angular/core';
import { UserSignupModel } from '../../models/userSignup.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  user !:UserSignupModel;

  constructor(private router: Router) { }
  
  signup(signupForm: FormGroup<any>) {
    if(signupForm.valid){
      this.user = {
          username:signupForm.value.username,
          email:signupForm.value.email,
          password:signupForm.value.password,
      };
      this.store(this.user);
      this.router.navigate(['/todo'])  
    }
  }
  
  store(user: UserSignupModel){
      let users: UserSignupModel[] = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user);
      localStorage.setItem('users' ,JSON.stringify(users));
      localStorage.setItem('currentUser' ,JSON.stringify(user));
  }
}
