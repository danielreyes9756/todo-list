import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  public cutrez=1;
  constructor(private firestoreService: FirestoreService, private router: Router) { }

  task = {
    Name: '',
    Description: '',
    Priority: 10,
    Status: "Pending",
    createdAt: String
  };

  ngOnInit(): void {}
  
  createTask() {
    const data = {
      Name: this.task.Name,
      Description: this.task.Description,
      Priority: this.task.Priority,
      Status: "Pending",
      createdAt: String(new Date())
    };

    if (data.Name.length == 0) { alert("Error while creating a Name is empty!"); return false;}
    this.firestoreService.createTask(data).then(
      () => {
        alert("Task created succesfully!")
        this.router.navigate(['./todo']);
      }, error =>{
        alert("Error while creating a task")
        console.error(error)
      }
    )
  }

  cancel(){
    this.router.navigate(['./todo']);
  }

}
