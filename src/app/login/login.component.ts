import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  step: number = 1; // Initialize step to 1
  Formvalue ! :FormGroup;
  errorMessage: string = ''; // Variable to hold the error message
  isError: boolean = false; // Variable to toggle error state
  constructor(private fb : FormBuilder, public rtr : Router , private api : ApiService, private profileService: ProfileService) { }
  ngOnInit(): void {
    this.Formvalue = this.fb.group(
      {
        email : [''],
        password : ['']
      }
    )

  }
  forsignup(){
    this.rtr.navigate(["signup"]);
  }
 

  login() {
    this.api.getUsers().subscribe(res => {
      const user = res.find((payload: any) => {
        return payload.Email === this.Formvalue.value.email && payload.Password === this.Formvalue.value.password;
      });

      if (user) {
        this.profileService.login(user);
        this.Formvalue.reset();
        this.step = 3; // Set step to 3 to show the welcome message
        setTimeout(() => {
          this.rtr.navigate(['dashboard']); // Navigate to dashboard after delay
        }, 3000);
      } else {
        // Set error message and toggle error state
        this.errorMessage = 'Incorrect email or password. Please try again';
        this.isError = true;
      }
    }, err => {
      alert('Something went wrong');
    });
  }
}
