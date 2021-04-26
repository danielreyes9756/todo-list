import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy{
  title = 'todo-list';
  
  navLinks: any[];
  activeLinkIndex = -1; 
  sub: any;
  colorTheme = false;
  item= '🌕';
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'List of Task',
            link: './todo',
            index: 0
        }, {
            label: 'Add Task',
            link: './addTask',
            index: 1
        }
    ];
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
  changeTheme(){
    this.colorTheme= !this.colorTheme
    if(this.item === '🌕') this.item = '☀️';
    else this.item = '🌕'
    document.body.setAttribute('color-theme', (String)(this.colorTheme))
  }
  ngOnDestroy(){
    // prevent memory leak when component destroyed
    this.sub.unsubscribe();
  }
}
