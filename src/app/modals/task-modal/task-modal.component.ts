import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Output() showModalComponent = new EventEmitter<boolean>();
public projectName!: string;
projectId!: number 
groupId: any;
description!: string
dueDate!: string
assigneeMail!: string
currentStatusId!: number
taskDTO = {
  description: this.description,
  dueDate: this.dueDate,
  assigneeMail: this.assigneeMail,
  currentStatusId: this.currentStatusId
}
public projectDescription!: string;
constructor(private http: HttpClient, private route : ActivatedRoute) { }
  closeModal(): void {
    this.showModalComponent.emit(false);
  } 
  onSubmit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = params["groupId"];
      this.projectId = params["projectId"];
      this.http.post(`https://localhost:7197/api/groups/${this.groupId}/projects/${this.projectId}/tasks`,{ description: this.description,
      dueDate: this.dueDate,
      assigneeMail: this.assigneeMail,
      currentStatusId: this.currentStatusId})
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
