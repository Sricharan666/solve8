import { Component } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  personData: any; // Use the correct type if you know the structure of data

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.personData = this.profileService.loggedInUser;
  }
}
