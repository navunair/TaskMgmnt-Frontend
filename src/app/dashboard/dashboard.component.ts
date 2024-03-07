import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../modals/group-modal/modal.component';
// import { ModalComponent } from "../group-modal/modal.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [HttpClientModule, CommonModule, ModalComponent]
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  groupData: any;
  public Modal : boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('Bearer'); 
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('https://localhost:7197/api/groups', { headers: headers, responseType: 'json' })
      .subscribe(
        (res) => {
          console.log("Success", res);
          this.groupData = res;
        },
        (error) => {
          window.alert(error);
          console.error("Error", error);
        }
      );
  } 
  viewProjects(groupId: number): void {
    
    this.router.navigate(['projects'],{queryParams:{groupId:groupId}});
  }
  logout(): void {
    localStorage.removeItem('Bearer');
    this.router.navigate(['signin']);
  }
  showModal(): void {
    this.Modal = true;
  }
  setModal(value:boolean): void {
    this.Modal = value;
  }
  setLoading(): void {
    this.loading = true;
  }
}
