import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  @Output() showModalComponent = new EventEmitter<boolean>();
public projectName!: string;
groupId: any;
public projectDescription!: string;
constructor(private http: HttpClient, private route : ActivatedRoute) { }
  closeModal(): void {
    this.showModalComponent.emit(false);
  } 
  onSubmit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = params["groupId"];
      this.http.post(`https://localhost:7197/api/groups/${this.groupId}/projects`,{ projectName: this.projectName, projectDescription: this.projectDescription })
      .subscribe(
        (res) => {
          console.log("Success", res);
        },
        (error) => {
          // window.alert(error);
          console.error("Error", error);
        }
      );  
    });
  }
  
}

