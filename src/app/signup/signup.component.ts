import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { SignupModel } from './signup-model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signupForm !: FormGroup;
  step: number = 1;
  public user : any;
  userModelObj: SignupModel = new SignupModel();
  designations: string[] = ['Developer', 'Manager', 'Analyst', 'Tester']; // Mocked Designation List
  allowedOrgIds: string[] = ['ORG001', 'ORG002', 'ORG003']; // Mocked allowed organization IDs
  organizationError: string = '';
  private orgIdIntervalId: any;
  constructor(private fb: FormBuilder, public rtr: Router, private api: ApiService, private store : Store<any>) {
    store.select('user').subscribe(
      data=>{
        this.user = data;
      }
    )
  }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      // Step 1 fields
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      // Step 2 fields
      orgname: ['', Validators.required],
      orgid: ['', Validators.required],
      designation: ['', Validators.required],
      birthdate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // 6-digit validation
    });

    this.loadMockData();

   this.signupForm.controls['email'].setValue(this.user.email);
   
    // Start interval for organization ID validation
    this.startOrgIdValidation();
  }

  loadMockData() {
    // Simulate API call to fetch allowed org IDs and designations
    this.api.getMockData().subscribe(data => {
      this.allowedOrgIds = data.allowedOrgIds;
      this.designations = data.designations;
    });
  }

  nextStep() {
    if (this.signupForm.controls['email']&&
      this.signupForm.controls['fullname'] &&
      this.signupForm.controls['password']) {
      this.step = 2;
    } else {
      alert('Please fill in all required fields in Step 1.');
    }
  }
  backStep() {
    if (this.signupForm.controls['orgname'] &&
      this.signupForm.controls['orgid'] &&
      this.signupForm.controls['designation']&&
      this.signupForm.controls['birthdate'] &&
      this.signupForm.controls['city']) {
      this.step = 1;
    } else {
      alert('Please fill in all required fields in Step 1.');
    }
  }

  startOrgIdValidation() {
    this.orgIdIntervalId = setInterval(() => {
      this.validateOrgId();
    }, 500); // Check every 500 milliseconds
  }
  validateOrgId() {
    const orgId = this.signupForm.controls['orgid'].value;
    if (orgId && !this.allowedOrgIds.includes(orgId)) {
      this.organizationError = 'Unknown organization ID';
    } else {
      this.organizationError = '';
    }
  }

  postUserData() {
    this.userModelObj.Email = this.signupForm.value.email;
    this.userModelObj.fullName = this.signupForm.value.fullname;
    this.userModelObj.Password = this.signupForm.value.password;
    this.userModelObj.orgName = this.signupForm.value.orgname;
    this.userModelObj.orgId = this.signupForm.value.orgid;
    this.userModelObj.Designation = this.signupForm.value.designation;
    this.userModelObj.birthDate = this.signupForm.value.birthdate;
    this.userModelObj.City = this.signupForm.value.city;
    this.userModelObj.Pincode = this.signupForm.value.pincode;

    this.api.postUser(this.userModelObj).subscribe(data=>{
      this.rtr.navigate(['login']);
      this.signupForm.reset();
    })
  }

  showWelcomeMessage() {
    this.step = 3;
    setTimeout(() => {
      this.postUserData();
    }, 3000); 
  }

  forsignup(){
    this.rtr.navigate(["login"]);
  }  
}
