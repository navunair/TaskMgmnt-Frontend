import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModalComponent } from "../modals/task-modal/task-modal.component";

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [CommonModule, TaskModalComponent]
})
export class TasksComponent {
  groupId: any;
  projectId: any;
  tasks: any; 
  public Modal : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('Bearer'); 
    this.route.queryParams.subscribe(params => {
      this.groupId = params["groupId"];
      this.projectId = params["projectId"];
      this.http.get(`https://localhost:7197/api/groups/${this.groupId}/projects/${this.projectId}/tasks`)
      .subscribe(
        (res) => {
          console.log("Success", res);
          this.tasks = res;
        },
        (error) => {
          // window.alert(error);
          console.error("Error", error);
        }
      );  
    });
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
