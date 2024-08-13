import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }
  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/posts", data)
   }
  
  getUsers(){
    return this.http.get<any>("http://localhost:3000/posts")
  }
  
  // deleteUser(id : number){
  //   return this.http.delete<any>("http://localhost:3000/posts/"+id)
  // }
  
  // updateUser(data : any, id : number){
  //   return this.http.put<any>("http://localhost:3000/posts/"+id, data)
  // }

  getMockData(): Observable<any> {
    // Mocked data
    return of({
      allowedOrgIds: ['ORG001', 'ORG002', 'ORG003'],
      designations: ['Developer', 'Manager', 'Analyst', 'Tester']
    });
  }
}
