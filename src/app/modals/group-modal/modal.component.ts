import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Output() showModalComponent = new EventEmitter<boolean>();
public groupName!: string;
constructor(private http: HttpClient) { }
  closeModal(): void {
    this.showModalComponent.emit(false);
  } 
  onSubmit(): void {
    const token = localStorage.getItem('Bearer'); 
    this.http.post<any[]>('https://localhost:7197/api/groups', { groupName: this.groupName })
      .subscribe(
        (res) => {
          console.log("Success", res);
        },
        (error) => {
          window.alert(error);
          console.error("Error", error);
        }
      );
  } 
  
}
