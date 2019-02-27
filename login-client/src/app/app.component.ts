import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, flatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public http: HttpClient) {}


  public loginStatus: any;
  public dashboardStatus: any;
  public logoutStatus: any;

  loginAndOut$ = this.http.post('http://192.168.1.93:3000/login', {
      username: 'someone',
      password: '1234'
  }).pipe(
      tap(result => console.log(result)), // log the response to console
      tap(res => (this.loginStatus = res['msg'])),
      flatMap(() =>
        this.http.post('http://192.168.1.93:3000/dashboard', {
          data: 'nothing'
})
),
      tap(result => console.log(result)), // log the response to console
      tap(res => (this.dashboardStatus = res['msg'])),
      flatMap(() =>
        this.http.post('http://192.168.1.93:3000/logout', { data: 'nothing' })
),
      tap(result => console.log(result)), // log the response to console
      tap(res => (this.logoutStatus = res['msg']))
);

  ngOnInit(){
    this.loginAndOut$.subscribe(() => console.log('done'));
  }
}
