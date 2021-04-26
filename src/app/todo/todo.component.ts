import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { Task } from "src/app/services/firestore/firestore.service"
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  public tasks: Observable<Task[]>;
  
  step = -1;
  totalSelected = 0; 

  selector='Priority';
  status = ['In progress', 'Pending', 'Complete'];
  count_status = [0, 0, 0];
  boolean_status = [false, false, false];

  constructor(private firestoreService: FirestoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasks = this.firestoreService.getTasks();
  }

  updateTask(selectedTask: any) {
    let copy_selectedTask = Object.assign({}, selectedTask)
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: copy_selectedTask});
    
    dialogRef.afterClosed().subscribe(result =>{
      if(result != false) this.firestoreService.updateTask(selectedTask.id, result).then(
        () => {
          alert("Task updated!")
        }, error => {
          console.error(error);
          alert('An error ocurred while trying to update')
        });
      },
    error => {
      console.error(error);
      alert('An error ocurred while trying to update');
    });
  }

  setStatus(taskId: Number,ev: any){
    if (document.getElementById(String(taskId))['checked']){
      
      document.getElementById(String(taskId))['checked'] = false;
      this.selectById(taskId)
    }
    this.firestoreService.setStatus(taskId, ev).then(
    () =>{}
    ,error => {
      console.error(error);
    });
  }

  deleteTask(taskId) {
    let checkbox = document.getElementById(taskId); 
    if(confirm("are you sure?")){
      this.firestoreService.deleteTask(taskId).then(() => {
        if(checkbox['checked']) {
          this.totalSelected--;
          document.getElementById(checkbox['name'])['checked'] = false;
          let index = this.status.indexOf(checkbox['name'])
          this.count_status[index]--; 
        }
        alert('You remove a task!');
      }, error => {
        alert('An error occurred while trying to delete!');
        console.error(error);
      });
    }
  }

  deleteSelected(){
    if(this.totalSelected == 0){ alert("You can't remove 0 tasks!"); return -1;}

    if(confirm("you are trying to delete " + this.totalSelected + " tasks are you sure?")){

      let finalCount = this.totalSelected;
      let checkboxes_InProcces = document.getElementsByName(this.status[0]); 
      let checkboxes_Pending = document.getElementsByName(this.status[1]); 
      let checkboxes_Complete = document.getElementsByName(this.status[2]); 
      let total = [checkboxes_InProcces, checkboxes_Pending, checkboxes_Complete];

      total.forEach(checkboxes => {
        for(var i=0, n=checkboxes.length;i<n;i++) {
          if(checkboxes[i]['checked']){
            this.firestoreService.deleteTask(checkboxes[i]['id']).then(() => {
            }, error => {
              alert('An error occurred while trying to delete!');
              console.error(error);
            });
          }
        }
      })

      alert('You remove ' + finalCount + 'tasks!');
      this.totalSelected=0;
      this.count_status = [0,0,0];
      this.boolean_status = [false,false,false];
      this.status.forEach(st =>  document.getElementById(st)['checked'] = false);
      return 0;
    }
  }

  selectAll(){ this.status.forEach(st => this.selectByStatus(st)); }
  
  selectByStatus(status: any) {

    let checkboxes = document.getElementsByName(status);
    let index = this.status.indexOf(status)
    this.boolean_status[index] = !this.boolean_status[index];
    let count = 0;

    for(var i=0, n=checkboxes.length;i<n;i++) {
      if(this.boolean_status[index] !== checkboxes[i]['checked']){
        checkboxes[i]['checked']=this.boolean_status[index];
        count++;
      }
    }

    if(this.boolean_status[index]){
      this.count_status[index] = checkboxes.length;
      this.totalSelected += count;
      document.getElementById(status)['checked'] = true; 
    } else {
      this.count_status[index] = 0;
      this.totalSelected -= count;
      document.getElementById(status)['checked'] = false; 
    }
  }

  selectById(id: any) {
    let checkbox = document.getElementById(id); 
    let index = this.status.indexOf(checkbox['name']);

    if(checkbox['checked']){
      this.count_status[index] ++;
      this.totalSelected++;
      if(this.count_status[index] === document.getElementsByName(checkbox['name']).length){
        document.getElementById(checkbox['name'])['checked'] = true; 
        this.boolean_status[index]=true;
      }
    } else {
      this.count_status[index] --;
      this.totalSelected--;
      this.boolean_status[index]=false;
      document.getElementById(checkbox['name'])['checked'] = false; 
    }
  }
  
  setStep(index: number) { this.step = index; }

  sortByProperty(event){this.selector=event;}

  sortByStatus(event){
    let letters = [event[0], event[2], event[4]];
    
    let statusSorted = [];
    let count = 0;
    
    letters.forEach(element => {
      if (element === "I") statusSorted[count]='In progress';
      if (element === "P") statusSorted[count]='Pending';
      if (element === "C") statusSorted[count]='Complete';
      count++;
    });

    let count_status_sorted= [0, 0, 0];
    let boolean_status_sorted= [false, false, false];
    
    for(let i = 0; i < this.status.length; i++){
      for(let j = 0; j < statusSorted.length; j++){
        if(this.status[i] == statusSorted[j]) {
          boolean_status_sorted[j] = this.boolean_status[i];
          count_status_sorted[j] = this.count_status[i]
        }
      }
    }

    this.status = statusSorted;
    this.count_status = count_status_sorted;
    this.boolean_status = boolean_status_sorted;

  }
}