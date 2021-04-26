import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../firestore/firestore.service';

@Pipe({name: 'sortBy'})
export class SortBy implements PipeTransform {

    transform(arr: Task[], field: String): Task[]{
        if(arr != null){
            return arr.sort((a, b) => {
                if (field === "Priority"){ 
                    return Number(a.Priority) - Number(b.Priority);
                } else if (field === "Name") {
                    if(a.Name < b.Name) { return -1; }
                    if(a.Name > b.Name) { return 1; }
                    return 0;
                } else if (field === "createdAt") {
                    return new Date(String(a.createdAt)).getTime() -  new Date(String(b.createdAt)).getTime();
                } else {
                    return 0;
                }
            });
        }
    }
}