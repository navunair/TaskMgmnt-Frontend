import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModalComponent } from "../modals/project-modal/project-modal.component";

@Component({
    selector: 'app-project',
    standalone: true,
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'] // Use styleUrls instead of styleUrl
    ,
    imports: [CommonModule, HttpClientModule, ProjectModalComponent]
})
export class ProjectComponent implements OnInit {
  groupId: any;
  projectId: any;
  projects: any; 
  public Modal : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('Bearer'); 
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    });
    this.route.queryParams.subscribe(params => {
      this.groupId = params["groupId"];
      this.http.get(`https://localhost:7197/api/groups/${this.groupId}/projects`, { headers: headers, responseType: 'json' })
      .subscribe(
        (res) => {
          console.log("Success", res);
          this.projects = res;
        },
        (error) => {
          // window.alert(error);
          console.error("Error", error);
        }
      );  
    });
  }
  viewTask(groupId:number,projectId: number): void {
    
    this.router.navigate(['tasks'],{queryParams:{groupId:groupId,projectId:projectId}});
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
}
