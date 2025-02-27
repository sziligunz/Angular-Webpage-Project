import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {}
  onSubmit(): void {
    const email = this.signupForm.get('email')?.value || '';
    const password = this.signupForm.get('password')?.value || '';
    if (!email || !password) {
      alert("Email vagy a jelszó üres!");
    }
    this.authService
      .signup(email, password)
      .then((cred) => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: email,
          username: this.signupForm.get('username')?.value as string,
          type:'user'
        };
        this.userService
          .create(user)
          .then((_) => {
            console.log('Sikeres regisztráció');
          })
          .catch((error) => {
            alert("Hiba történt a regisztráció során!");
            console.log(error);
          }); 
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
