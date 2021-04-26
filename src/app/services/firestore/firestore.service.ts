import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Task {
  id?: String,
  Name: String,
  Description: String,
  Status: String,
  Priority: Number,
  createdAt: String;
}

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  public tasks: Observable<Task[]>;
  public taskCollection: AngularFirestoreCollection<Task>;

  constructor(private firestore: AngularFirestore) { 
    this.taskCollection = this.firestore.collection<Task>('task');
    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(res => {
          const data = res.payload.doc.data();
          const id = res.payload.doc.id;
          return {id, ...data};
        });
      }) 
    )
  }
 
  createTask(data) {
    return this.firestore.collection('task').add(data);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async setStatus(id, taskStatus) {
    await this.delay(300);
    return this.firestore.collection("task").doc(id).update({Status: taskStatus});
  }

  deleteTask(id) {
    return this.firestore.collection("task").doc(id).delete();
  }

  updateTask(id, task) {
    if(task.Name.length == 0){
      alert("Field name can't be empty")
    } else{
      return this.firestore.collection("task").doc(id).set(task);
    }
  }
  
}
