

# TodoList By Daniel Reyes García
## **ENG**
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Proyect Angular 🔧
```
Angular CLI version: 11.2.0
Node version: 14.15.5
Typescript version: 4.1.5
Database Firebase
```
## Run server
To Run the server use the command `ng serve`. Navigate to `http://localhost:4200/`.

## Material Components
In this project we use this Material Components:
* MatCard
* MatExpansion
* MatDialog
* MatRadio
* MatInput
* MatTabs
* MatIcon
## Project Components
* TodoComponent
* AddTaskComponent
* DialogExampleComponent
## Services
In this project we can see two service, one is the sevice that connect with the database, the other one is a pipe that I use to sort the information, but it was an error this file must be a pipe no a service.
## Model
This project had a model called Task:
```
export interface Task {
  id?: String,
  Name: String,
  Description: String,
  Status: String,
  Priority: Number,
  createdAt: String;
}
```
## SPA
